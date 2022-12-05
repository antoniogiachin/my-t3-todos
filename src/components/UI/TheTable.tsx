import { useEffect, useState } from "react";

interface TableValue {
  [key: string]: string | number;
}

interface TheTableProps {
  toBeDisplayed: TableValue[];
}

export const TheTable = ({ toBeDisplayed }: TheTableProps) => {
  const [heads, setHeads] = useState<string[]>([]);

  // const example = [{name: 'Antonio', surname: Giachin, age: 30},  {name: 'Antonio', surname: Giachin, age: 30}, ];

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
          <td key={index}>{td}</td>
        ))}
        <th>
          <button className="btn-ghost btn-xs btn">details</button>
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
