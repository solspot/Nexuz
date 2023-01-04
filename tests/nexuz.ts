import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Pegasus } from "../target/types/pegasus";

const assert = require('assert');


describe("nexuz", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  
  function deriveProfilePDA(username, programID) {
    return anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from(username)],
      programID,
    )[0]
  }

  function deriveExistsPDA(publicKey, programID) {
    return anchor.web3.PublicKey.findProgramAddressSync(
      [publicKey.toBuffer()],
      programID,
    )[0]
  }

  const program = anchor.workspace.Pegasus as Program<Pegasus>;
  let profile = anchor.web3.Keypair.generate();
  let profile2 = anchor.web3.Keypair.generate();

  let solspot = new anchor.web3.PublicKey("7eXSNy1Q2b7SLCWNtprRT6KAViDrk94jj2ht8z1UNoar");
  let usernameToUse = "test";

  let profilePDA = deriveProfilePDA(usernameToUse, program.programId);
  let profilePDA2 = deriveProfilePDA(usernameToUse + "1", program.programId);

  let existsPDA = deriveExistsPDA(profile.publicKey, program.programId);
  let existsPDA2 = deriveExistsPDA(profile2.publicKey, program.programId);

  it('can initialize a profile', (async () => {
    // Check if wallet already has a Profile 
    let profileExists = await program.account.userAlreadyExists.fetchNullable(existsPDA);
    assert.ok(profileExists == null);

    let tx = await program.provider.connection.requestAirdrop(profile.publicKey, 1500000000);
    await program.provider.connection.confirmTransaction(tx);

    await program.methods.initializeProfile(usernameToUse.toUpperCase()).accounts({
        profilePda: profilePDA,
        profileExists: existsPDA,
        user: profile.publicKey,
        solspot: solspot,
        systemProgram: anchor.web3.SystemProgram.programId
      }).signers([profile]).rpc();

      // Check if profile is initialized
      let profilePDAcaseSensitive = deriveProfilePDA(usernameToUse, program.programId);
      const foundProfile = await program.account.profile.fetchNullable(profilePDAcaseSensitive);
      assert.ok(foundProfile != null);
    }));

  it('can update a user', async () => {
    let bio = "test1";
    let pfp = "https://test1";
    let display_name = "test1";
    let banner = "https://test1";
    let links = [
      {name: "test1", url: "https://test1"}, {name: "test1", url: "https://test1"}, {name: "test1", url: "https://test1"}, {name: "test1", url: "https://test1"}, 
      {name: "test1", url: "https://test1"}, {name: "test1", url: "https://test1"}, {name: "test1", url: "https://test1"}, {name: "test1", url: "https://test1"}, 
      {name: "test1", url: "https://test1"}, {name: "test1", url: "https://test1"}, {name: "test1", url: "https://test1"}, {name: "test1", url: "https://test1"},
      {name: "test1", url: "https://test1"}, {name: "test1", url: "https://test1"}, {name: "test1", url: "https://test1"}
    ];
    let theme = "test1";
    
    await program.methods.updateProfile(
      bio, pfp, display_name, banner, links, theme).accounts(
        {
          profilePda: profilePDA,
            user: profile.publicKey, 
        }
    ).signers([profile]).rpc();

  const foundProfile = await program.account.profile.fetch(profilePDA);
  assert.ok(foundProfile.displayName == "test1");
  })

  it('can ensure uniqueness of username on creation', (async () => {
    let tx = await program.provider.connection.requestAirdrop(profile2.publicKey, 1500000000);
    await program.provider.connection.confirmTransaction(tx);

    try {
      await program.methods.initializeProfile(usernameToUse).accounts({
        profilePda: profilePDA,
        profileExists: existsPDA2,
        user: profile2.publicKey,
        solspot: solspot,
        systemProgram: anchor.web3.SystemProgram.programId
      }).signers([profile2]).rpc();
    }
    catch (e) {
      assert(e.toString().includes("custom program error: 0x0"));
    }
  }));

  it('can initialize a profile', (async () => {
      // Check if wallet already has a Profile 
      let profileExists = await program.account.userAlreadyExists.fetchNullable(existsPDA2);
      assert.ok(profileExists == null);
    
    let tx = await program.provider.connection.requestAirdrop(profile2.publicKey, 1500000000);
    await program.provider.connection.confirmTransaction(tx);

    await program.methods.initializeProfile(usernameToUse + "1").accounts({
        profilePda: profilePDA2,
        profileExists: existsPDA2,
        user: profile2.publicKey,
        solspot: solspot,
        systemProgram: anchor.web3.SystemProgram.programId
      }).signers([profile2]).rpc();

      // Check if profile is initialized
      const foundProfile = await program.account.profile.fetch(profilePDA2);
  }));

  it('can ensure uniqueness of username on update', (async () => {
      let tx = await program.provider.connection.requestAirdrop(profile2.publicKey, 1500000000);
      await program.provider.connection.confirmTransaction(tx);
      
      try {
        await program.methods.updateUsername(usernameToUse).accounts({
          newProfilePda: profilePDA,
          profilePda: profilePDA2,
          profileExists: existsPDA2,
          user: profile2.publicKey
         }).signers([profile2]).rpc();
      }
      catch (e) {
        assert(e.toString().includes("custom program error: 0x0"));
      }
      }
  ));

  it('can change a username', async () => {
    // Check if account exists
    let new_username = "test2";
    let new_profilePDA = deriveProfilePDA(new_username, program.programId);
    let profile_data = await program.account.profile.fetchNullable(new_profilePDA);
    assert.ok(profile_data === null);
    
    await program.methods.updateUsername(new_username).accounts(
        {
          newProfilePda: new_profilePDA,
          profilePda: profilePDA,
          profileExists: existsPDA,
          user: profile.publicKey
        }
      ).signers([profile]).rpc();
    
    let newProfile = await program.account.profile.fetchNullable(new_profilePDA);
    assert.ok(newProfile.username == "test2");
    profilePDA = new_profilePDA;
    }
  )

  it('can delete a user', async () => {
    await program.methods.deleteProfile().accounts({
        profilePda: profilePDA,
        profileExists: existsPDA,
        user: profile.publicKey,
    }).signers([profile]).rpc();
    
    let profile_data = await program.account.profile.fetchNullable(profilePDA);
    assert.ok(profile_data === null);
  })

  it('can delete a user', async () => {
    let filter_data_first = await program.account.profile.all([
      {
        memcmp: {
          offset: 8, // Discriminator.
          bytes: profile2.publicKey.toBase58(),
        },
      },
    ]);

    assert.ok(filter_data_first.length == 1);

    await program.methods.deleteProfile().accounts({
        profilePda: profilePDA2,
        profileExists: existsPDA2,
        user: profile2.publicKey,
    }).signers([profile2]).rpc();
    
    let profile_data = await program.account.profile.fetchNullable(profilePDA2);
    assert.ok(profile_data === null);

    let filter_data = await program.account.profile.all([
      {
        memcmp: {
          offset: 8, // Discriminator.
          bytes: profile2.publicKey.toBase58(),
        },
      },
    ]);
    assert.ok(filter_data.length == 0);
  })
});
