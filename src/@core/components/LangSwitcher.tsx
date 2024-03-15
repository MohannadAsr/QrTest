import React from 'react';
import MuiIcon from './MuiIcon';
import { Button, Menu, MenuItem, MenuList } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useLang from '@src/hooks/useLang';

function LangSwitcher() {
  const { i18n } = useTranslation();
  const { changeLang } = useLang();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Langs = [
    { name: 'De', value: 'de', title: 'Germany' },
    { name: 'en', value: 'en', title: 'English' },
  ];

  const changeLangTo = (val: string) => {
    changeLang(val);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="text"
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        color="inherit"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className=" text-gray-400 flex justify-center items-center gap-3"
      >
        <img
          src={`/langs/${
            Langs.find((item) => item.value == i18n.language)?.value
          }.svg`}
          className=" w-6"
          alt=""
        />
        {/* {i18n.language} */}
        <span className=" lg:block hidden">
          {Langs.find((item) => item.value == i18n.language)?.title}
        </span>
        {!open ? (
          <MuiIcon name="KeyboardArrowDownOutlined" />
        ) : (
          <MuiIcon name="KeyboardArrowUpOutlined" />
        )}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{ zIndex: 1000 }}
      >
        <MenuList sx={{ minWidth: '165px' }}>
          {Langs.map((item, index) => {
            return (
              <MenuItem
                onClick={() => changeLangTo(item.value)}
                key={index}
                disabled={item.value == i18n.language}
              >
                <div className=" flex justify-between items-center gap-5">
                  <img src={`/langs/${item.value}.svg`} width={30} />
                  <span>{item.name}</span>
                </div>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
}

export default LangSwitcher;
