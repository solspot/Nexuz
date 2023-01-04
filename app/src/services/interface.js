import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { Program } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import idl from 'assets/idl.json';
import { formatProfileUpload } from './utils';

// Get our program's id from the IDL file, set network type, confirm when finalized
const programID = new PublicKey(idl.metadata.address);
const connection = new Connection(
  'https://summer-young-wildflower.solana-mainnet.discover.quiknode.pro/096d1990d053a1323bf1c973aaff56100ad53f80/'
);

function deriveProfilePDA(username, programId) {
  if (typeof programId === 'string') {
    programId = new PublicKey(programId);
  }
  return anchor.web3.PublicKey.findProgramAddressSync(
    // eslint-disable-next-line no-undef
    [Buffer.from(username)],
    programId
  )[0];
}

function deriveExistsPDA(publicKey, programId) {
  if (typeof programId === 'string') {
    programId = new PublicKey(programId);
  }
  return anchor.web3.PublicKey.findProgramAddressSync([publicKey.toBuffer()], programId)[0];
}

// used on manage account side
const loadProfileByPubkey = async (publicKey) => {
  try {
    let provider = new anchor.AnchorProvider(connection, new Keypair());
    const program = new Program(idl, programID, provider);

    let profileExistsPda = deriveExistsPDA(publicKey, new PublicKey(programID));
    let userExists = await program.account.userAlreadyExists.fetchNullable(profileExistsPda);
    let foundProfile = await program.account.profile.fetchNullable(userExists?.user);

    return foundProfile;
  } catch (error) {
    return undefined;
  }
};

// only used on display
const loadProfileByUsername = async (username) => {
  try {
    let provider = new anchor.AnchorProvider(connection, new Keypair());
    let program = new anchor.Program(idl, programID, provider);

    const userPDA = deriveProfilePDA(username.toLowerCase(), programID);
    const foundProfile = await program.account.profile.fetchNullable(userPDA);

    return foundProfile;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const initializeProfile = async (publicKey, sendTransaction, username) => {
  try {
    let provider = new anchor.AnchorProvider(connection, new Keypair());
    const program = new Program(idl, programID, provider);

    let profilePDA = deriveProfilePDA(username.toLowerCase(), programID);
    let existsPDA = deriveExistsPDA(publicKey, programID);

    let tx = await program.methods
      .initializeProfile(username.toLowerCase())
      .accounts({
        profilePda: profilePDA,
        profileExists: existsPDA,
        user: publicKey,
        solspot: new anchor.web3.PublicKey('AxfhziL5aew9MHuonRU9pWC3cgzFZF5GLWeyUY84Yf6t'),
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .signers(publicKey)
      .transaction();

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight }
    } = await connection.getLatestBlockhashAndContext();

    // run transaction
    const signature = await sendTransaction(tx, connection, { minContextSlot });

    // confirm transaction was finalized
    const confirmation = await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature
    });

    return confirmation;
  } catch (error) {
    console.log(error);
    if (error.toString().includes('0x1')) {
      return { value: { err: 'Not enough SOL to fund account.' } };
    }
    if (error.toString().includes('0x0')) {
      return { value: { err: 'This username is already taken.' } };
    }
    return { value: { err: 'Unknown error occurred.' } };
  }
};

/* Update the profile */
const updateProfile = async (profile, sendTransaction, publicKey) => {
  try {
    profile = formatProfileUpload(profile);
    let provider = new anchor.AnchorProvider(connection, new Keypair());
    const program = new Program(idl, programID, provider);

    let profilePDA = deriveProfilePDA(profile.username.toLowerCase(), programID);

    let tx = await program.methods
      .updateProfile(
        profile.bio,
        profile.pfp,
        profile.displayName,
        profile.banner,
        profile.links,
        profile.styles
      )
      .accounts({
        profilePda: profilePDA,
        user: publicKey
      })
      .signers(publicKey)
      .transaction();

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight }
    } = await connection.getLatestBlockhashAndContext();

    // run transaction
    const signature = await sendTransaction(tx, connection, { minContextSlot });

    // confirm transaction was finalized
    const confirmation = await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature
    });

    return confirmation;
  } catch (error) {
    console.log('Error updating Profile account:', error);
    return error;
  }
};

/* Update the username of a PDA account */
const updateUsername = async (newUsername, oldUsername, publicKey, sendTransaction) => {
  try {
    let provider = new anchor.AnchorProvider(connection, new Keypair());
    const program = new Program(idl, programID, provider);

    let newUsernamePDA = deriveProfilePDA(newUsername.toLowerCase(), programID);
    let oldUsernamePDA = deriveProfilePDA(oldUsername.toLowerCase(), programID);
    let existsPDA = deriveExistsPDA(publicKey, programID);

    let tx = await program.methods
      .updateUsername(newUsername)
      .accounts({
        newProfilePda: newUsernamePDA,
        profilePda: oldUsernamePDA,
        profileExists: existsPDA,
        user: publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .signers(publicKey)
      .transaction();

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight }
    } = await connection.getLatestBlockhashAndContext();

    // run transaction
    const signature = await sendTransaction(tx, connection, { minContextSlot });

    // confirm transaction was finalized
    const confirmation = await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature
    });

    return confirmation;
  } catch (error) {
    console.log(error);
    return error;
  }
};

/* Delete a profile */
const deleteProfile = async (username, sendTransaction, publicKey) => {
  try {
    let provider = new anchor.AnchorProvider(connection, new Keypair());
    const program = new Program(idl, programID, provider);

    let profilePDA = deriveProfilePDA(username.toLowerCase(), programID);
    let existsPDA = deriveExistsPDA(publicKey, programID);

    let tx = await program.methods
      .deleteProfile()
      .accounts({
        profilePda: profilePDA,
        profileExists: existsPDA,
        user: publicKey
      })
      .signers(publicKey)
      .transaction();

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight }
    } = await connection.getLatestBlockhashAndContext();

    // run transaction
    const signature = await sendTransaction(tx, connection, { minContextSlot });

    // confirm transaction was finalized
    const confirmation = await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature
    });

    return confirmation;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  loadProfileByPubkey,
  loadProfileByUsername,
  initializeProfile,
  updateProfile,
  updateUsername,
  deleteProfile
};
