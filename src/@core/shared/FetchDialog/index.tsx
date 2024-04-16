import { Dialog, Paper } from '@mui/material';
import MuiIcon from '@src/@core/components/MuiIcon';
import { handleFetchDialog } from '@src/actions/App/AppSlice';
import { AppDispatch, RootState } from '@src/store/store';
import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextTranslation from '../Translation/TextTranslation';

function FetchDialog() {
  const { Fetch } = useSelector((state: RootState) => state.App);
  const dispatch = useDispatch<AppDispatch>();
  const type = React.useMemo(() => {
    if (Fetch.successType == 'create') return 'Created Successfully';
    if (Fetch.successType == 'delete') return 'Deleted Successfully';
    if (Fetch.successType == 'update') return 'Updated Successfully';
  }, [Fetch]);

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(handleFetchDialog({ ...Fetch, open: false }));
    }, 2500);
  }, []);
  return (
    <Dialog open={Fetch.open} maxWidth="xs" fullWidth>
      <div className=" flex items-center flex-col gap-5 justify-center p-5 my-10 relative">
        <div>
          {Fetch.type == 'success' && <img src="/success.png" width={200} />}
          {Fetch.type == 'error' && <img src="/deleteAlert.svg" width={100} />}
        </div>
        {Fetch.type == 'success' && (
          <div className=" flex items-center gap-5 text-5 relative font-semibold">
            <TextTranslation>{type}</TextTranslation>
          </div>
        )}
        {Fetch.type == 'error' && (
          <div className=" flex items-center gap-3 text-5 relative font-semibold">
            <TextTranslation>Failed to Complete the Process</TextTranslation>
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default FetchDialog;
