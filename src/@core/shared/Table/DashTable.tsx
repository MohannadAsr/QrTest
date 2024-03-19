import {
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Divider,
  LinearProgress,
  MenuItem,
  Pagination,
  Paper,
  Select,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { lightTheme } from '@src/@core/Providers/DashThemeProvider';
import MuiIcon from '@src/@core/components/MuiIcon';
import React from 'react';
import NoTableData from './NoTableData';
import { PaginationControlDTO, paginationDTO } from '@src/actions/Vips/Dto';

function DashTable({
  name,
  data,
  titles,
  isFetching = false,
  isLoading = false,
  actions,
  selectedIds,
  setSelectedIds,
  onDelete,
  filterOptions,
  paginationData,
  paginationControl,
  setPaginationControl,
}: {
  name: string;
  data: { id: string; cells: (string | JSX.Element)[] }[];
  titles: { name: string; propertyName?: string }[];
  isFetching?: boolean;
  isLoading?: boolean;
  actions?: JSX.Element;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  onDelete: () => void;
  filterOptions?: JSX.Element;
  paginationData?: paginationDTO;
  paginationControl?: PaginationControlDTO;
  setPaginationControl?: React.Dispatch<
    React.SetStateAction<PaginationControlDTO>
  >;
}) {
  const addToSelectList = (id: string) => {
    const findExist = selectedIds.findIndex((item) => item == id);
    findExist == -1
      ? setSelectedIds((prev) => [...prev, id])
      : setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const switchSelectAll = () => {
    selectedIds?.length > 0
      ? setSelectedIds([])
      : setSelectedIds([...data.map((item) => item.id)]);
  };

  if (isLoading)
    return (
      <div className=" my-10 flex justify-center items-center flex-col text-primary font-bold gap-2">
        <p>Bitte warten</p>
        <CircularProgress />
      </div>
    );

  return (
    <div className=" flex flex-col gap-1">
      <div className=" flex items-center gap-3 flex-wrap my-3">
        {actions}
        {selectedIds?.length > 0 && (
          <Button
            variant="contained"
            startIcon={<MuiIcon name="Delete" />}
            color="error"
            sx={{ minWidth: 90 }}
            onClick={onDelete}
          >
            Löschen
          </Button>
        )}
      </div>
      {filterOptions && <div>{filterOptions}</div>}
      {data?.length > 0 ? (
        <>
          <TableContainer component={Card}>
            {isFetching && <LinearProgress color="success" />}
            <Table sx={{ minWidth: 240 }} size="small">
              <TableHead
                sx={{
                  fontWeight: 900,
                  backgroundColor: lightTheme.palette.primary.main,
                }}
              >
                <TableRow>
                  <TableCell>
                    <Checkbox
                      disabled={isFetching || isLoading}
                      color="error"
                      sx={{ color: '#fff' }}
                      onClick={switchSelectAll}
                      checked={data?.every((item) =>
                        selectedIds.includes(item.id)
                      )}
                    />
                  </TableCell>
                  {titles?.map((title, index) => {
                    return (
                      <TableCell
                        key={index}
                        sx={{
                          color: '#fff',
                          minWidth: 140,
                          backgroundColor: lightTheme.palette.primary.main,
                        }}
                        className=" text-lg capitalize "
                      >
                        {title.name}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.length > 0 && !isLoading ? (
                  data?.map((item, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                          },
                        }}
                      >
                        <TableCell>
                          <Checkbox
                            disabled={isFetching || isLoading}
                            color="error"
                            checked={selectedIds.includes(item.id)}
                            onClick={() => addToSelectList(item.id)}
                          />
                        </TableCell>
                        {item?.cells?.map((val, valIndex) => {
                          return (
                            <TableCell
                              key={valIndex}
                              component="th"
                              scope="row"
                            >
                              {val}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {paginationData && (
            <>
              <Divider />
              <Paper className=" flex items-center justify-between px-5 bg-white py-2 rounded-md shadow-lg">
                <p className=" text-[12px] md:text-[16px]">
                  <strong>Gesamtergebnisse:</strong> {paginationData.totalCount}
                </p>
                <Pagination
                  disabled={isLoading || isFetching}
                  page={paginationData?.page}
                  onChange={(e, page) =>
                    setPaginationControl({
                      ...paginationControl,
                      pageIndex: Number(page),
                    })
                  }
                  size="small"
                  count={paginationData?.totalPages}
                />
                <Select
                  disabled={isLoading || isFetching}
                  value={paginationData.pageSize}
                  size="small"
                  onChange={(e) =>
                    setPaginationControl({
                      ...paginationControl,
                      pageSize: Number(e.target.value),
                    })
                  }
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </Paper>
            </>
          )}
        </>
      ) : (
        <NoTableData name={name} />
      )}
    </div>
  );
}

export default DashTable;
