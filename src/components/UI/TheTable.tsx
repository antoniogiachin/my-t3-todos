import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";

import { faPlane, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TableValue {
  [key: string]: string | number | Array<unknown>;
}

interface TheTableProps {
  toBeDisplayed: TableValue[];
  fieldToExclude?: string[];
  baseDetailsUrl?: string;
  tableContext?: string;
}

export const TheTable = ({
  toBeDisplayed,
  baseDetailsUrl,
  fieldToExclude,
  tableContext,
}: TheTableProps) => {
  const [heads, setHeads] = useState<string[]>([]);
  const [buttonLoader, setButtonLoader] = useState<number | null>();

  const router = useRouter();

  // const example = [{name: 'Antonio', surname: Giachin, age: 30},  {name: 'Antonio', surname: Giachin, age: 30}, ];
  const { mutateAsync: getTodoParam } =
    trpc.todo.getTodoListSlugByUserId.useMutation();

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
    if (fieldToExclude?.length) {
      fieldToExclude.forEach((field: string) => {
        toBeDisplayed.forEach((tb) => {
          delete tb[field];
        });
      });
    }

    const first = toBeDisplayed[0];
    // @ts-ignore
    setHeads((prevHeads) => [...new Set(Object.keys(first))]);
  }, [toBeDisplayed, fieldToExclude]);

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
            <div className="flex space-x-2">
              {buttonLoader === index ? (
                <FontAwesomeIcon icon={faSync} className="fa-spin" />
              ) : (
                <FontAwesomeIcon icon={faPlane} />
              )}
              <span>Details</span>
            </div>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rowsRendered}</tbody>
        {/* <!-- foot --> */}
        <tfoot>
          <tr>
            <th></th>
            {headRendered}
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
