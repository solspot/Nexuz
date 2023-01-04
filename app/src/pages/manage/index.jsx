import React, { useEffect, useState, useContext } from 'react';

// libs
import { useWallet } from '@solana/wallet-adapter-react';
import { loadProfileByPubkey } from 'services/interface';

// local
import { CustomThemeContext } from 'theme/index';
import { formatProfileAccount } from 'services/utils';
import Login from './login.jsx';
import ProfileCreate from './profileCreate';
import { genID } from 'services/utils.js';

const CreateRoot = () => {
  const { setTheme } = useContext(CustomThemeContext);
  let { publicKey, disconnect } = useWallet();
  const [profile, setProfile] = useState();
  const [original, setOriginal] = useState();
  const [isUser, setIsUser] = useState();

  let date = new Date();
  let rand = Math.floor(date.getMinutes() / 10) + 1;

  const load = async (isNew) => {
    if (!publicKey) return;

    try {
      let foundProfile = await loadProfileByPubkey(publicKey);
      if (!foundProfile) throw new Error('No profile created yet');
      let formatedProfile = formatProfileAccount(foundProfile);

      setIsUser(true);

      // if new creation, add default solspot account link lfg
      if (isNew) {
        setProfile({
          ...formatedProfile,
          links: [
            {
              name: 'My Solspot Profile',
              url: `solspot.xyz/${publicKey}`,
              id: genID()
            }
          ]
        });
      } else {
        setProfile({ ...formatedProfile });
      }
      setOriginal({ ...formatedProfile, links: JSON.parse(JSON.stringify(formatedProfile.links)) });

      return true;
    } catch (error) {
      setIsUser(false);
      return false;
    }
  };

  const logout = () => {
    disconnect();
    setProfile();
    setIsUser(false);
    setTheme('home' + rand);
  };

  useEffect(() => {
    sessionStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    setTheme('home' + rand);
  }, []);

  if (publicKey && isUser)
    return (
      <ProfileCreate
        original={original}
        setOriginal={setOriginal}
        profile={profile}
        setProfile={setProfile}
        logout={logout}
      />
    );
  return <Login loadProfile={load} isUser={isUser} setIsUser={setIsUser} />;
};

export default CreateRoot;
