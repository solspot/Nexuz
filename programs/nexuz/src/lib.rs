use anchor_lang::prelude::*;
use anchor_lang::prelude::Pubkey;

declare_id!("6C5Mf4sDpFzhNbrZtMf1b4RFLbnAzUdZ9C86cz2MZPh");


#[program]
pub mod nexuz {
    use super::*;

    pub fn initialize_profile(ctx: Context<InitializeProfile>, username: String) -> Result<()> {
        let user_account: &mut Account<Profile> = &mut ctx.accounts.profile_pda;
        let user: &Signer = &ctx.accounts.user;
        let profile_exists: &mut Account<UserAlreadyExists> = &mut ctx.accounts.profile_exists;
        
        if &ctx.accounts.solspot.key().to_string() != "AxfhziL5aew9MHuonRU9pWC3cgzFZF5GLWeyUY84Yf6t" {
            return err!(CustomErrors::InvalidReciever);
        }

        if username.len() > 20 {
            return err!(CustomErrors::UsernameTooLong);
        }

        if username.len() == 0 {
            return err!(CustomErrors::UsernameInvalid);
        }

        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.user.key(),
            &ctx.accounts.solspot.key(),
            100000000,
        );

        let _solana_transfer = anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.user.to_account_info(),
                ctx.accounts.solspot.to_account_info(),
            ],
        );

        user_account.user = *user.key;
        user_account.username = username;
        profile_exists.user = ctx.accounts.profile_pda.key();

        msg!("Profile successfully created! ✨");

        Ok(())
    }

    pub fn delete_profile(ctx: Context<DeleteProfile>) -> Result<()> {
        let user_account: &mut Account<Profile> = &mut ctx.accounts.profile_pda;
        let user: &Signer = &ctx.accounts.user;

        if user.key != &user_account.user {
            return err!(CustomErrors::NotAuthorized);
        }

        msg!("Profile successfully deleted! ❌");
        Ok(())
    }

    pub fn update_profile(ctx: Context<UpdateProfile>, bio: String, pfp: String, display_name: String, banner: String, links: Vec<Link>, styles: String) -> Result<()> {
        let user_account: &mut Account<Profile> = &mut ctx.accounts.profile_pda;

        if bio.len() > 200 {
            return err!(CustomErrors::BioTooLong);
        }

        if pfp.len() > 150 {
            return err!(CustomErrors::PfpTooLong);
        }

        if banner.len() > 150 {
            return err!(CustomErrors::BannerTooLong);
        }

        if display_name.len() > 50 {
            return err!(CustomErrors::DisplayNameTooLong);
        }

        if styles.len() > 20 {
            return err!(CustomErrors::StylesTooLong);
        }

        if links.len() > 15 {
            return err!(CustomErrors::TooManyLinks);
        }

        for link in links.iter() {
            if link.url.len() > 95 {
                return err!(CustomErrors::LinkTooLong);
            }

            if link.name.len() > 30 {
                return err!(CustomErrors::LinkNameTooLong);
            }
        }

        user_account.pfp = pfp;
        user_account.banner = banner;
        user_account.bio = bio;
        user_account.display_name = display_name;
        user_account.styles = styles;

        user_account.links = links;

        msg!("Profile successfully updated! ✨");

        Ok(())
    }

    pub fn update_username(ctx: Context<UpdateUsername>, new_username: String) -> Result<()> {
        let old_user: &mut Account<Profile> = &mut ctx.accounts.profile_pda;
        let user_account: &mut Account<Profile> = &mut ctx.accounts.new_profile_pda;
        let user: &Signer = &ctx.accounts.user;
        let profile_exists: &mut Account<UserAlreadyExists> = &mut ctx.accounts.profile_exists;

        if new_username.len() > 20 {
            return err!(CustomErrors::UsernameTooLong);
        }

        if new_username.len() == 0 {
            return err!(CustomErrors::UsernameInvalid);
        }

        user_account.username = new_username;
        user_account.user = *user.key;
        user_account.bio = (*old_user.bio).to_string();
        user_account.pfp = (*old_user.pfp).to_string();
        user_account.display_name = (*old_user.display_name).to_string();
        user_account.styles = (*old_user.styles).to_string();
        user_account.links = (*old_user.links).to_vec();

        msg!("Username successfully updated! ✨");

        profile_exists.user = ctx.accounts.new_profile_pda.key();

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(username: String)]
pub struct UpdateUsername<'info> {
    #[account(init, space=Profile::LEN, payer=user, seeds=[username.as_ref()], bump)]
    pub new_profile_pda: Account<'info, Profile>,
    
    #[account(mut, close = user)]
    pub profile_pda: Account<'info, Profile>,
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut, seeds=[user.key().as_ref()], bump)]
    pub profile_exists: Account<'info, UserAlreadyExists>,

    #[account()]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateProfile<'info> {
  #[account(mut, has_one = user)]
  pub profile_pda: Account<'info, Profile>,
  pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteProfile<'info> {
    #[account(mut, close = user)]
    pub profile_pda: Account<'info, Profile>,

    #[account(mut, close=user, seeds=[user.key().as_ref()], bump)]
    pub profile_exists: Account<'info, UserAlreadyExists>,

    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(username: String)]
pub struct InitializeProfile <'info> {
    #[account(init, space=Profile::LEN, payer=user, seeds=[username.to_lowercase().as_ref()], bump)]
    pub profile_pda: Account<'info, Profile>,

    #[account(init, space=UserAlreadyExists::LEN, payer=user, seeds=[user.key().as_ref()], bump)]
    pub profile_exists: Account<'info, UserAlreadyExists>,

    #[account(mut)]
    pub user: Signer<'info>,

    /// CHECK: Check Check
    #[account(mut)]
    pub solspot: AccountInfo<'info>,

    #[account()]
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Profile {
    pub user: Pubkey,
    pub username: String,
    pub bio: String,
    pub pfp: String,
    pub display_name: String,
    pub banner: String,
    pub links: Vec<Link>,
    pub styles: String
}

#[account]
pub struct UserAlreadyExists {
    pub user: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Link {
    pub name: String,
    pub url: String,
}

#[error_code]
pub enum CustomErrors {
    #[msg("Invalid Solspot Wallet. Pls use: AxfhziL5aew9MHuonRU9pWC3cgzFZF5GLWeyUY84Yf6t")]
    InvalidReciever,
    #[msg("Username already taken")]
    UserAlreadyExists,
    #[msg("You are not authorized to perform this action")]
    NotAuthorized,
    #[msg("Username is too long")]
    UsernameTooLong,
    #[msg("Bio is too long")]
    BioTooLong,
    #[msg("Pfp is too long")]
    PfpTooLong,
    #[msg("Banner is too long")]
    BannerTooLong,
    #[msg("Display name is too long")]
    DisplayNameTooLong,
    #[msg("Styles is too long")]
    StylesTooLong,
    #[msg("Too many links")]
    TooManyLinks,
    #[msg("Link is too long")]
    LinkTooLong,
    #[msg("Link name is too long")]
    LinkNameTooLong,
    #[msg("Link is invalid")]
    LinkInvalid,
    #[msg("Pfp is invalid")]
    PfpInvalid,
    #[msg("Banner is invalid")]
    BannerInvalid,
    #[msg("Username is invalid")]
    UsernameInvalid,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.

const PUBLIC_KEY_LENGTH: usize = 32;
const MAX_USERNAME_LENGTH: usize = 20 * 4;
const MAX_BIO_LENGTH: usize = 200 * 4;
const MAX_PFP_LENGTH: usize = 150 * 4;
const MAX_DISPLAY_NAME_LENGTH: usize = 50 * 4;
const MAX_BANNER_LENGTH: usize = 150 * 4;
const MAX_STYLES_LENGTH: usize = 20 * 4;

const MAX_LINKS: usize = 15;
const MAX_LINK_NAME_LENGTH: usize = 30 * 4;
const MAX_LINK_URL_LENGTH: usize = 95 * 4;

impl Profile {
    const LEN: usize = 
        DISCRIMINATOR_LENGTH +
        STRING_LENGTH_PREFIX + MAX_USERNAME_LENGTH +
        STRING_LENGTH_PREFIX + MAX_BIO_LENGTH +
        STRING_LENGTH_PREFIX + MAX_PFP_LENGTH +
        STRING_LENGTH_PREFIX + MAX_DISPLAY_NAME_LENGTH +
        STRING_LENGTH_PREFIX + MAX_BANNER_LENGTH +
        STRING_LENGTH_PREFIX + MAX_STYLES_LENGTH +
        PUBLIC_KEY_LENGTH +
        STRING_LENGTH_PREFIX + MAX_LINKS * (STRING_LENGTH_PREFIX + MAX_LINK_NAME_LENGTH + STRING_LENGTH_PREFIX + MAX_LINK_URL_LENGTH);
}

impl UserAlreadyExists {
    const LEN: usize = DISCRIMINATOR_LENGTH + PUBLIC_KEY_LENGTH;
}
