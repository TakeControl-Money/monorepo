module takecontrol_money::pool {
    use std::signer;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::timestamp;
    use aptos_std::table::{Self, Table};
    
    /// Error codes
    const ERR_NOT_INITIALIZED: u64 = 1;
    const ERR_ALREADY_INITIALIZED: u64 = 2;
    const ERR_ZERO_DEPOSIT: u64 = 3;

    /// Struct to track deposits for each user
    struct UserDeposit has store {
        amount: u64,
        timestamp: u64
    }

    /// Main pool resource holding all deposits
    struct Pool has key {
        /// Total deposits in the pool
        total_deposits: u64,
        /// Track individual deposits
        deposits: Table<address, UserDeposit>,
        /// The pool's coin storage
        vault: Coin<AptosCoin>
    }

    /// Initialize a new pool
    public entry fun initialize_pool(account: &signer) {
        let addr = signer::address_of(account);
        assert!(!exists<Pool>(addr), ERR_ALREADY_INITIALIZED);
        
        move_to(account, Pool {
            total_deposits: 0,
            deposits: table::new(),
            vault: coin::zero()
        });
    }

    /// Deposit APT into the pool
    public entry fun deposit(
        account: &signer,
        pool_address: address,
        amount: u64
    ) acquires Pool {
        assert!(exists<Pool>(pool_address), ERR_NOT_INITIALIZED);
        assert!(amount > 0, ERR_ZERO_DEPOSIT);

        let pool = borrow_global_mut<Pool>(pool_address);
        let deposit_coins = coin::withdraw(account, amount);
        
        // Update total deposits
        pool.total_deposits = pool.total_deposits + amount;
        
        // Update or create user deposit record
        let depositor = signer::address_of(account);
        if (table::contains(&pool.deposits, depositor)) {
            let user_deposit = table::borrow_mut(&mut pool.deposits, depositor);
            user_deposit.amount = user_deposit.amount + amount;
            user_deposit.timestamp = timestamp::now_seconds();
        } else {
            table::add(&mut pool.deposits, depositor, UserDeposit {
                amount,
                timestamp: timestamp::now_seconds()
            });
        };

        // Add coins to pool's vault
        coin::merge(&mut pool.vault, deposit_coins);
    }

    /// View functions
    #[view]
    public fun get_pool_balance(pool_address: address): u64 acquires Pool {
        assert!(exists<Pool>(pool_address), ERR_NOT_INITIALIZED);
        let pool = borrow_global<Pool>(pool_address);
        coin::value(&pool.vault)
    }

    #[view]
    public fun get_user_deposit(pool_address: address, user_address: address): u64 acquires Pool {
        assert!(exists<Pool>(pool_address), ERR_NOT_INITIALIZED);
        let pool = borrow_global<Pool>(pool_address);
        if (table::contains(&pool.deposits, user_address)) {
            let user_deposit = table::borrow(&pool.deposits, user_address);
            user_deposit.amount
        } else {
            0
        }
    }

    /// Tests
    #[test_only]
    use aptos_framework::account;
    #[test_only]
    use aptos_framework::aptos_coin;
    #[test_only]
    use aptos_framework::coin::{BurnCapability, MintCapability};
    
    #[test(creator = @takecontrol_money)]
    public fun test_initialize_pool(creator: &signer) {
        account::create_account_for_test(signer::address_of(creator));
        initialize_pool(creator);
        assert!(exists<Pool>(signer::address_of(creator)), 0);
    }

    #[test(creator = @takecontrol_money, user = @0x456, framework = @aptos_framework)]
    public fun test_deposit(
        creator: &signer,
        user: &signer,
        framework: &signer
    ) acquires Pool {
        let creator_addr = signer::address_of(creator);
        let user_addr = signer::address_of(user);
        
        // Setup accounts and timestamp
        timestamp::set_time_has_started_for_testing(framework);
        account::create_account_for_test(creator_addr);
        account::create_account_for_test(user_addr);
        
        // Initialize AptosCoin and store capabilities
        let (burn_cap, mint_cap) = aptos_coin::initialize_for_test(framework);
        
        // Initialize pool
        initialize_pool(creator);
        
        // Setup test coins for user
        let test_amount = 1000000; // 1 APT
        coin::register<AptosCoin>(user);
        let coins = coin::mint(test_amount, &mint_cap);
        coin::deposit(user_addr, coins);
        
        // Test deposit
        deposit(user, creator_addr, test_amount);
        // Verify deposit
        assert!(get_pool_balance(creator_addr) == test_amount, 0);
        assert!(get_user_deposit(creator_addr, user_addr) == test_amount, 1);

        // Clean up capabilities
        coin::destroy_burn_cap(burn_cap);
        coin::destroy_mint_cap(mint_cap);
    }
} 
