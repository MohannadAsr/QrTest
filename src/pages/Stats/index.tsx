import LoadingButton from '@mui/lab/LoadingButton';
import { Button, FormLabel } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import MuiIcon from '@src/@core/components/MuiIcon';

import ApexBarChart from '@src/@core/shared/ApexBarChart';
import { useStatsQuery } from '@src/actions/Stats/useStatsQuery';
import { useCustomHooks } from '@src/hooks/useCustomHooks';
import React from 'react';

const dataToMonths = (stats: { month: string; count: number }[]) => {
  const MonthsArray = Array.from({ length: 12 });
  return MonthsArray?.map(
    (month, index) =>
      stats?.find((item) => item?.month == `${index}`.padStart(2, '0'))
        ?.count || 0
  );
};

function StatsPage() {
  const [year, setYear] = React.useState<string>(
    new Date().getFullYear().toString()
  );
  const { data, isFetching, refetch } = useStatsQuery({ currentYear: year });
  const { useTimerFn } = useCustomHooks();

  React.useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <div className=" container">
        <h1 className=" text-3 font-bold text-white">
          <span className=" text-success">Statistiken </span>
          Seite
        </h1>

        <div className="mt-7 bg-white shadow-md p-4 flex flex-col gap-3">
          <div className=" flex items-center gap-2 flex-wrap">
            <FormLabel>Wählen Sie das Jahr aus</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                format="yyyy"
                openTo="year"
                value={new Date(year)}
                onChange={(value) => {
                  setYear(new Date(value).getFullYear().toString());
                }}
              />
            </LocalizationProvider>
            <LoadingButton
              color="primary"
              onClick={() => refetch()}
              loading={isFetching}
              startIcon={<MuiIcon name="Search" />}
            >
              Suchen
            </LoadingButton>
          </div>
          <p className=" font-bold text-white bg-primary p-4 rounded-md">
            Statistiken für das Jahr {data?.year}
          </p>
          <ApexBarChart
            data={[
              { name: 'Veranstaltungen', data: dataToMonths(data?.events) },
              { name: 'Einladungen', data: dataToMonths(data?.invitations) },
              { name: "VIP'S", data: dataToMonths(data?.vips) },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
