import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";

import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TableValue {
  [key: string]: string | number | Array<unknown>;
}

interface TheTableProps {
  toBeDisplayed: TableValue[];
  baseDetailsUrl?: string;
  tableContext?: string;
}

export const TheTable = ({
  toBeDisplayed,
  baseDetailsUrl,
  tableContext,
}: TheTableProps) => {
  const [heads, setHeads] = useState<string[]>([]);
  const [buttonLoader, setButtonLoader] = useState<number | null>();

  const router = useRouter();

  // const example = [{name: 'Antonio', surname: Giachin, age: 30},  {name: 'Antonio', surname: Giachin, age: 30}, ];
  const { mutateAsync: getTodoParam } =
    trpc.todo.getTodoListByUserId.useMutation();

  const getUrlFromContextAndPush = useCallback(
    async (index: number) => {
      switch (tableContext) {
        case "todo-list":
          setButtonLoader(index);
          const res = await getTodoParam({
            title: toBeDisplayed[index]?.title as string,
          });
          if (!res?.slug) {
            return;
          }
          setButtonLoader(null);
          router.push(`${baseDetailsUrl}/${res?.slug}`);
        default:
          break;
      }
    },
    [tableContext, toBeDisplayed, baseDetailsUrl, router, getTodoParam]
  );

  useEffect(() => {
    const first = toBeDisplayed[0];
    // @ts-ignore
    setHeads((prevHeads) => [...new Set(Object.keys(first))]);
  }, [toBeDisplayed]);

  let headRendered!: React.ReactNode;
  if (!heads) {
    headRendered = <th>Provide a valid Array</th>;
  } else {
    headRendered = heads.map((th, index) => <th key={index}>{th}</th>);
  }

  let rowsRendered!: React.ReactNode;
  if (!Object.values(toBeDisplayed).length) {
    rowsRendered = <tr>Provide a valid Array</tr>;
  } else {
    rowsRendered = Object.values(toBeDisplayed).map((el, index) => (
      <tr key={index}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        {Object.values(el).map((td, index) => (
          <td key={index}>{Array.isArray(td) ? td.length : td ? td : "-"}</td>
        ))}
        <th>
          <button
            className="btn-ghost btn-xs btn"
            onClick={() => {
              getUrlFromContextAndPush(index);
            }}
          >
            <span className="flex space-x-2">
              {buttonLoader === index && (
                <FontAwesomeIcon icon={faSync} className="fa-spin me-2" />
              )}
              <span>Details</span>
            </span>
          </button>
        </th>
      </tr>
    ));
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            {headRendered}
            <th></th>
          </tr>
        </thead>
        <tbody>{rowsRendered}</tbody>
        {/* <!-- foot --> */}
        <tfoot>
          <tr>
            <th></th>
            {headRendered}
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
