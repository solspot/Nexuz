import React, { useEffect, useState } from 'react';

// libs
import PropTypes from 'prop-types';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { styled, Input, Typography, ButtonBase } from '@mui/material';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// local
import Column from 'components/column';
import { genID } from '../../services/utils';
import Text from 'components/text';

const Wrapper = styled('div')(() => ({
  width: '90%',
  maxWidth: 750,
  display: 'flex',
  flexDirection: 'column',
  marginTop: 50,
  marginBottom: 50
}));

const LinkItem = styled('div')(({ palette }) => ({
  width: '100%',
  padding: 15,
  borderRadius: 10,
  backgroundColor: palette?.offset,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '10px 0',
  border: '1.5px solid'
}));

const InputStyled = styled(Input)(({ palette }) => ({
  borderRadius: 12,
  color: palette?.text,
  padding: '0px 12px',
  marginRight: 35,
  marginLeft: 25,
  fontSize: 16,
  width: '100%',
  border: '1.5px solid',
  borderColor: 'rgba(0,0,0,0)',
  '&.Mui-focused': {
    backgroundColor: palette?.background,
    color: palette?.text,
    border: '1.5px solid',
    borderColor: palette?.accent
  }
}));

const CloseIcon = styled(CloseRoundedIcon)(({ palette }) => ({
  padding: 5,
  height: 34,
  width: 34,
  marginLeft: 5,
  borderRadius: 12,
  cursor: 'pointer',
  transition: '0.8s ease',
  color: palette?.text,
  '&:hover': {
    backgroundColor: palette?.background
  }
}));

const arrowIcon = {
  height: 35,
  width: 35,
  borderRadius: 12,
  marginLeft: 5,
  transition: '0.8s ease'
};

const CustomButton = styled(ButtonBase)(({ palette }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  color: palette.text,
  backgroundColor: palette?.offset,
  minWidth: 100,
  cursor: 'pointer',
  padding: '15px 20px',
  borderRadius: 15,
  transition: '0.8s ease',
  '&:hover': {
    transform: 'translateY(-5%)'
  }
}));

const Link = ({ profile, item, handleMove, handleChange, handleRemove, i, len }) => {
  return (
    <LinkItem
      palette={profile?.palette}
      sx={{
        borderColor: profile?.palette?.design === 2 ? profile?.palette?.accent : 'rgba(0,0,0,0)'
      }}>
      <Column>
        <InputStyled
          placeholder="Name"
          id="name"
          disableUnderline={true}
          value={item.name}
          onChange={(e) => handleChange(e, item.id)}
          palette={profile.palette}
        />
        <InputStyled
          placeholder="URL"
          id="url"
          disableUnderline={true}
          value={item.url}
          onChange={(e) => handleChange(e, item.id)}
          palette={profile?.palette}
        />
      </Column>

      <ArrowDropUpRoundedIcon
        sx={{
          opacity: i === 0 ? 0.3 : 1,
          cursor: i === 0 ? undefined : 'pointer',
          color: profile?.palette.text,
          '&:hover': {
            backgroundColor: i === 0 ? undefined : profile?.palette.background
          }
        }}
        onClick={() => handleMove(item, 'up')}
        style={arrowIcon}
      />
      <ArrowDropDownRoundedIcon
        sx={{
          opacity: i === len - 1 ? 0.3 : 1,
          cursor: i === len - 1 ? undefined : 'pointer',
          color: profile?.palette.text,
          '&:hover': {
            backgroundColor: i === len - 1 ? undefined : profile?.palette.background
          }
        }}
        onClick={() => handleMove(item, 'down')}
        style={arrowIcon}
      />
      <CloseIcon palette={profile?.palette} onClick={() => handleRemove(item.id)} />
    </LinkItem>
  );
};

const LinksManager = ({ profile, setProfile }) => {
  const [parent, enable] = useAutoAnimate({ duration: 300 });
  const [links, setLinks] = useState(profile.links);

  const handleMove = (item, dir) => {
    let clone = [...profile.links];
    let index = clone.findIndex((i) => i.id === item.id);
    clone.splice(index, 1);

    if (dir === 'up') {
      if (index == 0) return;
      clone.splice(index - 1, 0, item);
    } else {
      if (index === clone.length) return;
      clone.splice(index + 1, 0, item);
    }

    setLinks(clone);
    setProfile({ ...profile, links: clone });
  };

  const handleChange = (e, id) => {
    let index = links.findIndex((i) => i.id === id);
    let clone = [...profile.links];

    if (e.target.id === 'name') {
      if (e.target.value.length > 30) return;
      clone[index].name = e.target.value;
    } else {
      if (e.target.value.length > 100) return;
      clone[index].url = e.target.value;
    }

    setLinks(clone);
    setProfile({ ...profile, links: clone });
  };

  const handleRemove = (id) => {
    let clone = [...profile.links];
    clone = clone.filter((i) => i.id !== id);
    setLinks(clone);
    setProfile({ ...profile, links: clone });
  };

  const handleAdd = () => {
    let clone = [...profile.links];
    if (clone.length >= 20) return;

    clone.push({ id: genID(), name: '', url: '' });
    setLinks(clone);
    setProfile({ ...profile, links: clone });
  };

  useEffect(() => {
    enable(true);
  }, []);

  if (!profile) return null;

  return (
    <Wrapper>
      <Text type="title" sx={{ width: '100%', color: profile.palette.text }}>
        Links
      </Text>
      <div ref={parent} style={{ width: '100%' }}>
        {links.map((item, index) => (
          <Link
            profile={profile}
            key={item.id}
            i={index}
            item={item}
            len={links.length}
            handleMove={handleMove}
            handleChange={handleChange}
            handleRemove={handleRemove}
          />
        ))}
      </div>
      {links.length === 0 && (
        <LinkItem
          sx={{ borderColor: 'rgba(0,0,0,0)', backgroundColor: profile?.palette.offset }}
          onClick={handleAdd}>
          <Typography sx={{ mr: 'auto', color: profile.palette.text }}>
            Click the plus button to add Links
          </Typography>
          <CloseIcon
            palette={profile.palette}
            sx={{ transform: 'rotate(45deg)', borderRadius: 30, color: profile?.palette.text }}
            onClick={handleAdd}
          />
        </LinkItem>
      )}
      {links.length > 0 && (
        <CustomButton palette={profile?.palette} onClick={handleAdd}>
          Add Link
        </CustomButton>
      )}
    </Wrapper>
  );
};

Link.propTypes = {
  handleMove: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  len: PropTypes.number.isRequired
};

LinksManager.propTypes = {
  setProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default LinksManager;
