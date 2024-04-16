const ApproveHandler = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange?: (val: boolean) => void;
}) => {
  return (
    <div className=" flex items-center gap-2">
      <div
        onClick={() => onChange(true)}
        className={` px-5 py-1 ${
          value ? 'bg-success' : 'bg-success/30'
        }  rounded-xl text-white cursor-pointer`}
      >
        Ja
      </div>
      <div
        onClick={() => onChange(false)}
        className={` px-5 py-1 ${
          !value ? 'bg-error' : 'bg-error/30'
        }  rounded-xl text-white cursor-pointer`}
      >
        Nein
      </div>
    </div>
  );
};

export default ApproveHandler;
