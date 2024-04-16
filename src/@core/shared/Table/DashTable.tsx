import {
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
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
import React, { ReactNode } from 'react';
import NoTableData from './NoTableData';
import { ErrorButton } from '@src/styles/MuiComponents';
import { PaginationControlDTO, paginationDTO } from '@src/actions/Vips/Dto';

import MuiIcon from '@src/@core/components/MuiIcon';
import TableError from './TableError';
import TextTranslation from '../Translation/TextTranslation';
import { lightTheme } from '@src/@core/Providers/DashThemeProvider';

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
  onRowClick,
  isError,
}: {
  name: string;
  data: { id: string; cells: (string | JSX.Element)[] }[];
  titles: {
    name: string | ReactNode;
    propertyName?: string;
    filter?: boolean;
  }[];
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
  onRowClick?: (id: number | string) => any;
  isError?: boolean;
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
        <p>
          <TextTranslation>Loading ,Please Wait</TextTranslation>
        </p>
        <CircularProgress />
      </div>
    );

  return (
    <div className=" flex flex-col gap-3 mt-6">
      <div className=" flex items-center gap-3 flex-wrap">
        {actions}
        {selectedIds?.length > 0 && (
          <ErrorButton
            startIcon={<MuiIcon name="Delete" />}
            color="error"
            sx={{ minWidth: 90 }}
            onClick={onDelete}
            variant="contained"
          >
            <TextTranslation>Delete</TextTranslation> ({selectedIds?.length})
          </ErrorButton>
        )}
      </div>
      {/* {data?.length > 0 ? ( */}
      <>
        <TableContainer component={Card} sx={{ minWidth: 240 }} elevation={0}>
          {filterOptions && (
            <Paper className=" py-2 px-3" elevation={0}>
              {filterOptions}
            </Paper>
          )}
          {isFetching && <LinearProgress />}
          <Table size="small">
            <TableHead
              sx={{
                fontWeight: 900,
                backgroundColor: lightTheme.palette.primary.main,
              }}
            >
              <TableRow
                component={Paper}
                sx={{
                  backgroundColor: lightTheme.palette.primary.main,
                  color: '#fff',
                }}
              >
                <TableCell sx={{ width: 10 }}>
                  <Checkbox
                    color="error"
                    sx={{ color: '#fff' }}
                    onClick={switchSelectAll}
                    checked={data?.every((item) =>
                      selectedIds?.includes(item.id)
                    )}
                  />
                </TableCell>
                {titles?.map((title, index) => {
                  return (
                    <TableCell
                      component="th"
                      align="center"
                      key={index}
                      sx={{
                        fontSize: 12,
                        minWidth: { xs: 120, md: 90 },
                        color: '#fff',
                      }}
                      className={` text-lg uppercase font-bold  ${
                        title.filter && 'cursor-pointer'
                      }    `}
                    >
                      <span className=" flex items-center gap-2">
                        {title.name}
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 ? (
                data?.map((item, index) => {
                  return (
                    <TableRow
                      key={index}
                      className={`${onRowClick && 'cursor-pointer'}`}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
                      }}
                      onClick={() => (onRowClick ? onRowClick(item.id) : null)}
                    >
                      <TableCell sx={{ width: 10 }}>
                        <Checkbox
                          color="default"
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
                            align="left"
                            sx={{
                              // minWidth: 40,
                              fontSize: 13,
                              // maxWidth: 100,
                            }}
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
        {data?.length == 0 && (
          <>{isError ? <TableError /> : <NoTableData name={name} />}</>
        )}
        {paginationData && data?.length !== 0 && (
          <>
            {/* <Divider /> */}
            <Paper className=" flex items-center justify-between px-5 gap-2  py-1 flex-wrap rounded-md ">
              <p className=" text-[12px] md:text-[16px] md:order-1 order-3  ">
                <strong>
                  <TextTranslation>gesamt</TextTranslation> :
                </strong>{' '}
                {paginationData?.totalCount}
              </p>
              <Pagination
                dir="ltr"
                className="md:order-2 order-1"
                disabled={isLoading}
                page={paginationData?.page}
                onChange={(e, page) =>
                  setPaginationControl({
                    ...paginationControl,
                    pageIndex: Number(page),
                  })
                }
                size="small"
                count={
                  Math.ceil(
                    paginationData?.totalCount / paginationData.pageSize
                  ) || 1
                }
              />
              <Select
                sx={{ minHeight: 25 }}
                className="md:order-3 order-2"
                disabled={isLoading || isFetching}
                value={paginationData?.pageSize}
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
      {/* ) : ( */}
      {/* )} */}
    </div>
  );
}

export default DashTable;
