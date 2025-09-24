import { MoveLeft } from "lucide-react";
import { Music } from "./music";
import { Dispatch, SetStateAction } from "react";
import { TQueueSong } from "./musicSection";

const searchedResult = {
    "songResult": {
        "id": "K8GXHF5k",
        "name": "Dhun",
        "duration": 276,
        "language": "hindi",
        "image": [
            {
                "quality": "50x50",
                "url": "https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-50x50.jpg"
            },
            {
                "quality": "150x150",
                "url": "https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-150x150.jpg"
            }
        ],
        "url": {
            "quality": "160kbps",
            "url": "https://aac.saavncdn.com/598/3c7404398ea134a45858c09a267e9659_160.mp4"
        }
    },
    "albumResult": [
        {
            "id": "65034538",
            "name": "Saiyaara Teaser",
            "artists": {
                "primary": [
                    {
                        "name": "Tanishk Bagchi"
                    },
                    {
                        "name": "Faheem Abdullah"
                    },
                    {
                        "name": "Arslan Nizami"
                    },
                    {
                        "name": "Irshad Kamil"
                    }
                ],
                "all": [
                    {
                        "name": "Tanishk Bagchi"
                    },
                    {
                        "name": "Faheem Abdullah"
                    },
                    {
                        "name": "Arslan Nizami"
                    },
                    {
                        "name": "Tanishk Bagchi"
                    },
                    {
                        "name": "Faheem Abdullah"
                    },
                    {
                        "name": "Arslan Nizami"
                    },
                    {
                        "name": "Irshad Kamil"
                    }
                ]
            },
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/164/Saiyaara-Teaser-Hindi-2025-20250530064358-50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/164/Saiyaara-Teaser-Hindi-2025-20250530064358-150x150.jpg"
                }
            ]
        },
        {
            "id": "33163977",
            "name": "Saiyaara",
            "artists": {
                "primary": [
                    {
                        "name": "Nikhil D'souza"
                    }
                ],
                "all": [
                    {
                        "name": "Nikhil D'souza"
                    },
                    {
                        "name": "Tanishk Bagchi"
                    },
                    {
                        "name": "Faheem Abdullah"
                    },
                    {
                        "name": "Arslan Nizami"
                    },
                    {
                        "name": "Irshad Kamil"
                    }
                ]
            },
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/647/Saiyaara-Hindi-2022-20220304181731-50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/647/Saiyaara-Hindi-2022-20220304181731-150x150.jpg"
                }
            ]
        },
        {
            "id": "65068414",
            "name": "Saiyaara (From \"Saiyaara\")",
            "artists": {
                "primary": [
                    {
                        "name": "Tanishk Bagchi"
                    },
                    {
                        "name": "Faheem Abdullah"
                    },
                    {
                        "name": "Arslan Nizami"
                    },
                    {
                        "name": "Irshad Kamil"
                    }
                ],
                "all": [
                    {
                        "name": "Tanishk Bagchi"
                    },
                    {
                        "name": "Faheem Abdullah"
                    },
                    {
                        "name": "Arslan Nizami"
                    },
                    {
                        "name": "Tanishk Bagchi"
                    },
                    {
                        "name": "Faheem Abdullah"
                    },
                    {
                        "name": "Arslan Nizami"
                    }
                ]
            },
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/171/Saiyaara-From-Saiyaara-Hindi-2025-20250610140355-50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/171/Saiyaara-From-Saiyaara-Hindi-2025-20250610140355-150x150.jpg"
                }
            ]
        },
        {
            "id": "34385927",
            "name": "Saiyaara - LoFi Mix",
            "artists": {
                "primary": [
                    {
                        "name": "Sohail Sen"
                    }
                ],
                "all": [
                    {
                        "name": "Sohail Sen"
                    },
                    {
                        "name": "Mohit Chauhan"
                    },
                    {
                        "name": "Tarannum Malik Jain"
                    }
                ]
            },
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/618/Saiyaara-LoFi-Mix-Hindi-2022-20220420123023-50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/618/Saiyaara-LoFi-Mix-Hindi-2022-20220420123023-150x150.jpg"
                }
            ]
        },
        {
            "id": "65989780",
            "name": "Saiyaara",
            "artists": {
                "primary": [
                    {
                        "name": "Various Artists"
                    }
                ],
                "all": [
                    {
                        "name": "Tanishk Bagchi"
                    },
                    {
                        "name": "Faheem Abdullah"
                    },
                    {
                        "name": "Arslan Nizami"
                    },
                    {
                        "name": "The Rish"
                    },
                    {
                        "name": "Vishal Mishra"
                    },
                    {
                        "name": "Sachet-Parampara"
                    },
                    {
                        "name": "Mithoon"
                    },
                    {
                        "name": "Tanishk Bagchi"
                    },
                    {
                        "name": "Faheem Abdullah"
                    },
                    {
                        "name": "Arslan Nizami"
                    },
                    {
                        "name": "Irshad Kamil"
                    },
                    {
                        "name": "The Rish"
                    },
                    {
                        "name": "Jubin Nautiyal"
                    },
                    {
                        "name": "Vishal Mishra"
                    },
                    {
                        "name": "Hansika Pareek"
                    },
                    {
                        "name": "Raj Shekhar"
                    },
                    {
                        "name": "Sachet-Parampara"
                    },
                    {
                        "name": "Sachet Tandon"
                    },
                    {
                        "name": "Parampara Tandon"
                    },
                    {
                        "name": "Prashant Pandey"
                    },
                    {
                        "name": "Mithoon"
                    },
                    {
                        "name": "Arijit Singh"
                    },
                    {
                        "name": "Shreya Ghoshal"
                    },
                    {
                        "name": "Shilpa Rao"
                    }
                ]
            },
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-150x150.jpg"
                }
            ]
        },
        {
            "id": "3068045",
            "name": "Saiyaara Rebirth",
            "artists": {
                "primary": [
                    {
                        "name": "Sohail Sen"
                    }
                ],
                "all": [
                    {
                        "name": "Sohail Sen"
                    },
                    {
                        "name": "Sohail Sen"
                    }
                ]
            },
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/817/Saiyaara-Rebirth-Hindi-2016-50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/817/Saiyaara-Rebirth-Hindi-2016-150x150.jpg"
                }
            ]
        },
        {
            "id": "67178677",
            "name": "Saiyaara (Reprise)",
            "artists": {
                "primary": [
                    {
                        "name": "Peter Bin"
                    }
                ],
                "all": [
                    {
                        "name": "Peter Bin"
                    },
                    {
                        "name": "Sohail Sen"
                    }
                ]
            },
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/464/Saiyaara-Reprise-Hindi-2025-20250813213541-50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/464/Saiyaara-Reprise-Hindi-2025-20250813213541-150x150.jpg"
                }
            ]
        },
        {
            "id": "67921695",
            "name": "Saiyaara (Extended Album)",
            "artists": {
                "primary": [
                    {
                        "name": "Various Artists"
                    }
                ],
                "all": [
                    {
                        "name": "Tanishk Bagchi"
                    },
                    {
                        "name": "Faheem Abdullah"
                    },
                    {
                        "name": "Arslan Nizami"
                    },
                    {
                        "name": "John Stewart Eduri"
                    },
                    {
                        "name": "The Rish"
                    },
                    {
                        "name": "Vishal Mishra"
                    },
                    {
                        "name": "Sachet-Parampara"
                    },
                    {
                        "name": "Mithoon"
                    },
                    {
                        "name": "Tanishk Bagchi"
                    },
                    {
                        "name": "Faheem Abdullah"
                    },
                    {
                        "name": "Arslan Nizami"
                    },
                    {
                        "name": "John Stewart Eduri"
                    },
                    {
                        "name": "Suzanne D’Mello"
                    },
                    {
                        "name": "Irshad Kamil"
                    },
                    {
                        "name": "The Rish"
                    },
                    {
                        "name": "Jubin Nautiyal"
                    },
                    {
                        "name": "Vishal Mishra"
                    },
                    {
                        "name": "Hansika Pareek"
                    },
                    {
                        "name": "Raj Shekhar"
                    },
                    {
                        "name": "Sachet-Parampara"
                    },
                    {
                        "name": "Sachet Tandon"
                    },
                    {
                        "name": "Parampara Tandon"
                    },
                    {
                        "name": "Prashant Pandey"
                    },
                    {
                        "name": "Mithoon"
                    },
                    {
                        "name": "Arijit Singh"
                    },
                    {
                        "name": "Shreya Ghoshal"
                    },
                    {
                        "name": "Shilpa Rao"
                    },
                    {
                        "name": "Mellow D"
                    }
                ]
            },
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/141/Saiyaara-Extended-Album-Hindi-2025-20250909145935-50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/141/Saiyaara-Extended-Album-Hindi-2025-20250909145935-150x150.jpg"
                }
            ]
        },
        {
            "id": "67059053",
            "name": "Saiyaara (Cover Song)",
            "artists": {
                "primary": [
                    {
                        "name": "Ahmer Saeed"
                    }
                ],
                "all": [
                    {
                        "name": "Tanishk Bagchi"
                    },
                    {
                        "name": "Faheem Abdullah"
                    },
                    {
                        "name": "Arslan Nizami"
                    },
                    {
                        "name": "John Stewart Eduri"
                    },
                    {
                        "name": "The Rish"
                    },
                    {
                        "name": "Vishal Mishra"
                    },
                    {
                        "name": "Sachet-Parampara"
                    },
                    {
                        "name": "Mithoon"
                    },
                    {
                        "name": "Ahmer Saeed"
                    }
                ]
            },
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/403/Saiyaara-Cover-Song-Urdu-2025-20250809113245-50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/403/Saiyaara-Cover-Song-Urdu-2025-20250809113245-150x150.jpg"
                }
            ]
        },
        {
            "id": "65329983",
            "name": "Barbaad (From \"Saiyaara\")",
            "artists": {
                "primary": [
                    {
                        "name": "The Rish"
                    },
                    {
                        "name": "Jubin Nautiyal"
                    }
                ],
                "all": [
                    {
                        "name": "The Rish"
                    },
                    {
                        "name": "The Rish"
                    },
                    {
                        "name": "Jubin Nautiyal"
                    }
                ]
            },
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/485/Barbaad-From-Saiyaara-Hindi-2025-20250610140401-50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/485/Barbaad-From-Saiyaara-Hindi-2025-20250610140401-150x150.jpg"
                }
            ]
        }
    ],
    "playlistResult": [
        {
            "id": "107740743",
            "name": "Dhuniya Hits",
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/editorial/DhuniyaHits_20250910105733_50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/editorial/DhuniyaHits_20250910105733_150x150.jpg"
                }
            ]
        },
        {
            "id": "558107256",
            "name": "Dhunuchi Naach",
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/editorial/DhunuchiNaach_20250922054606_50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/editorial/DhunuchiNaach_20250922054606_150x150.jpg"
                }
            ]
        },
        {
            "id": "1084216113",
            "name": "Suruchir Dhunuchi",
            "image": [
                {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/editorial/SuruchirDhunuchi_20250423130743_50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/editorial/SuruchirDhunuchi_20250423130743_150x150.jpg"
                }
            ]
        }
    ]
}

export function SearchedMusic({ setQueueSongs }: {
    setQueueSongs: Dispatch<SetStateAction<TQueueSong[]>>
}) {


    return (
        <div>
            <div className="  " >
                <MoveLeft className="size-8 cursor-pointer " />
            </div>




        </div>
    )
}