import AddTabel from '@components/Products/AddTabel';
import MuiIcon from '@src/@core/components/MuiIcon';
import NoTableData from '@src/@core/shared/Table/NoTableData';
import TableLoading from '@src/@core/shared/Table/TableLoading';
import {
  MutateDeleteTables,
  useTabelsQuery,
} from '@src/actions/Products/useProductsQueries';
import { ErrorBtn } from '@src/styles/styledComponents';

function Tables() {
  const { data: tabels, isLoading } = useTabelsQuery();
  const { mutate: deleteTable, isPending: isDeleting } = MutateDeleteTables();

  const handleDeleteTable = (id: string) => {
    deleteTable([id]);
  };

  return (
    <div>
      <div className=" text-6 bg-primary p-3 text-white font-semibold rounded-md shadow-lg flex items-center justify-between">
        <p>Tische</p>
        <AddTabel />
      </div>
      {isLoading ? (
        <TableLoading />
      ) : (
        <>
          <div>{tabels?.length == 0 && <NoTableData name="Tabels" />}</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
            {tabels?.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" bg-white/90 p-3 rounded-md shadow-lg border-primary border-[3px]"
                >
                  <div className=" bg-secondary flex items-center justify-center rounded-md">
                    <MuiIcon
                      name="TableBar"
                      sx={{ fontSize: 60, color: '#fff' }}
                    />
                  </div>
                  <div className=" flex items-center justify-between mt-3 gap-3">
                    <div className="flex-1 flex flex-col items-center justify-center gap-2 text-white bg-secondary p-2 rounded-md">
                      <MuiIcon name="Numbers" />
                      <p>{item.number}</p>
                    </div>
                    <div className=" flex-1 flex flex-col items-center justify-center gap-2 text-white bg-secondary p-2 rounded-md">
                      <MuiIcon name="Chair" />
                      <p>{item.seats}</p>
                    </div>
                  </div>
                  <div className=" flex items-center justify-center mt-3">
                    <ErrorBtn
                      startIcon={<MuiIcon name="Delete" />}
                      onClick={() => handleDeleteTable(item.id)}
                      loading={isDeleting}
                    >
                      Löschen
                    </ErrorBtn>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Tables;
