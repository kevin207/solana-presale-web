export type SolanaIco = {
  "version": "0.1.0",
  "name": "solana_ico",
  "instructions": [
    {
      "name": "createIcoAta",
      "accounts": [
        {
          "name": "icoAtaForIcoProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "icoMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "icoAtaForAdmin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "icoAmount",
          "type": "u64"
        },
        {
          "name": "solPrice",
          "type": "u64"
        },
        {
          "name": "usdtPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositIcoInAta",
      "accounts": [
        {
          "name": "icoAtaForIcoProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "icoMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "icoAtaForAdmin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "icoAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyWithSol",
      "accounts": [
        {
          "name": "icoAtaForIcoProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "icoMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "icoAtaForUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "icoAtaForIcoProgramBump",
          "type": "u8"
        },
        {
          "name": "solAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyWithUsdt",
      "accounts": [
        {
          "name": "icoAtaForIcoProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "icoMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "icoAtaForUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdtAtaForUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdtAtaForAdmin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "icoAtaForIcoProgramBump",
          "type": "u8"
        },
        {
          "name": "usdtAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateData",
      "accounts": [
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solPrice",
          "type": "u64"
        },
        {
          "name": "usdtPrice",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "data",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "sol",
            "type": "u64"
          },
          {
            "name": "usdt",
            "type": "u64"
          },
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};

export const IDL: SolanaIco = {
  "version": "0.1.0",
  "name": "solana_ico",
  "instructions": [
    {
      "name": "createIcoAta",
      "accounts": [
        {
          "name": "icoAtaForIcoProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "icoMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "icoAtaForAdmin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "icoAmount",
          "type": "u64"
        },
        {
          "name": "solPrice",
          "type": "u64"
        },
        {
          "name": "usdtPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositIcoInAta",
      "accounts": [
        {
          "name": "icoAtaForIcoProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "icoMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "icoAtaForAdmin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "icoAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyWithSol",
      "accounts": [
        {
          "name": "icoAtaForIcoProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "icoMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "icoAtaForUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "icoAtaForIcoProgramBump",
          "type": "u8"
        },
        {
          "name": "solAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyWithUsdt",
      "accounts": [
        {
          "name": "icoAtaForIcoProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "icoMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "icoAtaForUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdtAtaForUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdtAtaForAdmin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "icoAtaForIcoProgramBump",
          "type": "u8"
        },
        {
          "name": "usdtAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateData",
      "accounts": [
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solPrice",
          "type": "u64"
        },
        {
          "name": "usdtPrice",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "data",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "sol",
            "type": "u64"
          },
          {
            "name": "usdt",
            "type": "u64"
          },
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};
