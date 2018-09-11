import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingBar from "../../../components/layout/LoadingBar";
import DataTable from "../../../components/layout/DataTable";

import { Character } from "../../../store/admin/characters";

interface Props {
  loading: boolean,
  data: Character[]
}

const List: React.SFC<Props> = ({ loading, data }) => {
  return (
    <React.Fragment>
      <div className="text-right">
        <LinkContainer to="./characters/create">
          <a
            href="./characters/create"
            className="btn btn-success"
            title="Create New" >
            Create New
          </a>
        </LinkContainer>
      </div>
      <div className="gutter-top">
        <DataTable columns={["Character"]}>
          {loading && data.length === 0 && (
            <tr>
              <td  colSpan={2}>
                <LoadingBar loading={loading} />
              </td>
            </tr>
          )}
          {!loading && data.map(character => (
            <tr key={character.id}>
              <td>
                <LinkContainer to={`./characters/${character.id}`}>
                  <div>
                    <a href={`./characters/${character.id}`}>
                      <h4>{character.name}</h4>
                    </a>
                    <span>{character.description}</span>
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


export default List;
