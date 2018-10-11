import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingBar from "../../../components/layout/LoadingBar";
import DataTable from "../../../components/layout/DataTable";

import { DataStatus } from "../../../store/shared";
import { Cutscene } from "../../../store/admin/cutscenes";

interface Props {
  status: DataStatus,
  data: Cutscene[]
}

export const List: React.SFC<Props> = ({ status, data }) => {
  const loading = status === DataStatus.LOADING;

  return (
    <React.Fragment>
      <div className="text-right">
        <LinkContainer to="./cutscenes/create">
          <a
            href="./cutscenes/create"
            className="btn btn-success"
            title="Create New" >
            Create New
          </a>
        </LinkContainer>
      </div>
      <div className="gutter-top">
        <DataTable columns={["Cutscene"]}>
          {loading && data.length === 0 && (
            <tr>
              <td>
                <LoadingBar loading={loading} />
              </td>
            </tr>
          )}
          {!loading && data.map(scene => (
            <tr key={scene.id}>
              <td>
                <LinkContainer to={`./cutscenes/${scene.id}`}>
                  <div>
                    <a href={`./cutscenes/${scene.id}`}>
                      <h4>{scene.name}</h4>
                    </a>
                    <span>{scene.description}</span>
                  </div>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </React.Fragment>
  );
};
