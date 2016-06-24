var data = {
	"playerVelocityX": 440,
	"playerVelocityBoostY": 600,
	"playerMaxVelocityY": 800,
	"playerBounceY": .4,
	"gravityY": 1600,
	"start": {
		"startBtn": "Get Started",
		"shareBtn": "Share with Friends",
		"eliteBtn": "Be a Hero with Elite 3E!"
	},
	"characterSelection": {
		"title": "Choose your Hero",
		"elite": "Be your company's hero! Check out Elite 3E.",
		"startBtn": "Start New Game",
		"shareBtn": "Share with Friends",
		"eliteBtn": "Be a Hero with Elite 3E!"
	},
	"about": {
		"title": "About the Game",
		"content": "Click to rocket faster or slower. Your hero will always rocket side to side.\r\nGain levels while collecting efficiencies (green) and avoiding obstacles and inefficiencies (red).",
		"resumeBtn": "Resume",
		"shareBtn": "Share with Friends",
		"eliteBtn": "Be a Hero with Elite 3E!"
	},
	"gameOver": {
		"title": "Game Over!",
		"score": "Current Points: {score}",
		"highScore": "High Points: {highScore}",
		"highLevel": "Highest Level: {highLevel}",
		"gamesPlayed": "Games Played: {gamesPlayed}",
		"elite": "You don't have to play games to be a hero. Check out Elite 3E to be the hero of your office!",
		"replayBtn": "Replay?",
		"shareBtn": "Share with Friends",
		"eliteBtn": "Be a Hero with Elite 3E!"
	},
	"basePanel": {
		"directions": "Click to rocket faster or slower. Your hero will always rocket side to side.\r\nGain levels while collecting efficiencies (green) and avoiding obstacles and inefficiencies (red).",
		"changeCharacterBtn": "Change Hero",
		"aboutGameBtn": "Info"
	},
	"ledgesLeft": [
			{
				"id": "ledge",
				"image": "assets/img/main/left-ledge.png"
			},
			{
				"id": "ledge-good-money",
				"image": "assets/img/main/left-ledge.png",
				"character": {
					"image": "assets/img/main/boss-money.png",
					"isGood": true,
					"points": 1,
					"width": 141,
					"height": 150,
					"anchorX": .25,
					"anchorY": 1,
					"offsetX": 40,
					"offsetY": 34
				}
			},
			{
				"id": "ledge-good-money-alt",
				"image": "assets/img/main/left-ledge.png",
				"character": {
					"image": "assets/img/main/womanboss-money.png",
					"isGood": true,
					"points": 1,
					"width": 141,
					"height": 150,
					"anchorX": .25,
					"anchorY": 1,
					"offsetX": 40,
					"offsetY": 30
				}
			},
			{
				"id": "ledge-good-time",
				"image": "assets/img/main/left-ledge.png",
				"character": {
					"image": "assets/img/main/boss-time.png",
					"isGood": true,
					"points": 3,
					"width": 141,
					"height": 150,
					"anchorX": .25,
					"anchorY": 1,
					"offsetX": 40,
					"offsetY": 34
				}
			},
			{
				"id": "ledge-bad-money",
				"image": "assets/img/main/left-ledge.png",
				"character": {
					"image": "assets/img/main/lawyer-money.png",
					"width": 151,
					"height": 150,
					"anchorX": .25,
					"anchorY": 1,
					"offsetX": 40,
					"offsetY": 26
				}
			},
			{
				"id": "ledge-bad-money-alt",
				"image": "assets/img/main/left-ledge.png",
				"character": {
					"image": "assets/img/main/boss-dirtymoney.png",
					"width": 151,
					"height": 150,
					"anchorX": .25,
					"anchorY": 1,
					"offsetX": 40,
					"offsetY": 26
				}
			},
			{
				"id": "ledge-bad-time",
				"image": "assets/img/main/left-ledge.png",
				"character": {
					"image": "assets/img/main/lawyer-time.png",
					"width": 141,
					"height": 150,
					"anchorX": .25,
					"anchorY": 1,
					"offsetX": 40,
					"offsetY": 26
				}
			}
	],
	"ledgesRight": [
			{
				"id": "ledge",
				"image": "assets/img/main/right-ledge.png"
			},
			{
				"id": "ledge-good-money",
				"image": "assets/img/main/right-ledge.png",
				"character": {
					"image": "assets/img/main/boss-money-right.png",
					"isGood": true,
					"points": 1,
					"width": 141,
					"height": 150,
					"anchorX": .75,
					"anchorY": 1,
					"offsetX": 40,
					"offsetY": 12
				}
			},
			{
				"id": "ledge-good-money-alt",
				"image": "assets/img/main/right-ledge.png",
				"character": {
					"image": "assets/img/main/womanboss-money-right.png",
					"isGood": true,
					"points": 1,
					"width": 141,
					"height": 150,
					"anchorX": .75,
					"anchorY": 1,
					"offsetX": 40,
					"offsetY": 8
				}
			},
			{
				"id": "ledge-good-time",
				"image": "assets/img/main/right-ledge.png",
				"character": {
					"image": "assets/img/main/boss-time-right.png",
					"isGood": true,
					"points": 3,
					"width": 141,
					"height": 150,
					"anchorX": .75,
					"anchorY": 1,
					"offsetX": 40,
					"offsetY": 12
				}
			},
			{
				"id": "ledge-bad-money",
				"image": "assets/img/main/right-ledge.png",
				"character": {
					"image": "assets/img/main/lawyer-money-right.png",
					"width": 151,
					"height": 150,
					"anchorX": .75,
					"anchorY": 1,
					"offsetX": 40,
					"offsetY": 4
				}
			},
			{
				"id": "ledge-bad-money-alt",
				"image": "assets/img/main/right-ledge.png",
				"character": {
					"image": "assets/img/main/boss-dirtymoney-right.png",
					"width": 151,
					"height": 150,
					"anchorX": .75,
					"anchorY": 1,
					"offsetX": 40,
					"offsetY": 4
				}
			},
			{
				"id": "ledge-bad-time",
				"image": "assets/img/main/right-ledge.png",
				"character": {
					"image": "assets/img/main/lawyer-time-right.png",
					"width": 141,
					"height": 150,
					"anchorX": .75,
					"anchorY": 1,
					"offsetX": 40,
					"offsetY": 4
				}
			}
	],
	"fallingObjects": [
			{
				"id": "star",
				"image": "assets/img/main/star.png",
				"isGood": true,
				"isPowerUp": true,
				"points": 5,
				"width": 61,
				"height": 60
			},
			{
				"id": "good-01",
				"image": "assets/img/main/money-good.png",
				"isGood": true,
				"points": 1,
				"width": 69,
				"height": 55
			},
			{
				"id": "good-02",
				"image": "assets/img/main/clock-good.png",
				"isGood": true,
				"points": 3,
				"width": 51,
				"height": 51
			},
			{
				"id": "good-03",
				"image": "assets/img/main/folder-clean.png",
				"isGood": true,
				"points": 1,
				"width": 61,
				"height": 43
			},
			{
				"id": "bad-01",
				"image": "assets/img/main/money-bad.png",
				"width": 69,
				"height": 63
			},
			{
				"id": "bad-02",
				"image": "assets/img/main/clock-bad.png",
				"width": 51,
				"height": 51
			},
			{
				"id": "bad-03",
				"image": "assets/img/main/folder-mess.png",
				"width": 61,
				"height": 43
			}
	],
	"levels": [
		{
			"height": 3000,
			"ledgeMinDistance": 700,
			"ledgeMaxDistance": 1000,
			"ledges": [
				{
					"id": "ledge",
					"ratio": 4
				},
				{
					"id": "ledge-good-money",
					"ratio": 1
				}
			],
			"fallingObjects": [
				{
					"id": "good-01",
					"count": 1
				},
				{
					"id": "good-02",
					"count": 1
				},
				{
					"id": "good-03",
					"count": 1
				}


				,{
					"id": "star",
					"count": 1
				}
			]
		},
		{
			"height": 3000,
			"ledgeMinDistance": 500,
			"ledgeMaxDistance": 800,
			"ledges": [
				{
					"id": "ledge",
					"ratio": 4
				},
				{
					"id": "ledge-good-money-alt",
					"ratio": 1
				},
				{
					"id": "ledge-bad-time",
					"ratio": 1
				}
			],
			"fallingObjects": [
				{
					"id": "good-01",
					"count": 1
				},
				{
					"id": "good-02",
					"count": 1
				},
				{
					"id": "good-03",
					"count": 1
				},
				{
					"id": "bad-02",
					"count": 1
				},
				{
					"id": "star",
					"count": 1
				}
			]
		},
		{
			"height": 3000,
			"ledgeMinDistance": 600,
			"ledgeMaxDistance": 800,
			"ledges": [
				{
					"id": "ledge",
					"ratio": 4
				},
				{
					"id": "ledge-good-time",
					"ratio": 1
				},
				{
					"id": "ledge-bad-money",
					"ratio": 1
				}
			],
			"fallingObjects": [
				{
					"id": "good-01",
					"count": 1
				},
				{
					"id": "good-02",
					"count": 1
				},
				{
					"id": "good-03",
					"count": 1
				},
				{
					"id": "bad-03",
					"count": 1
				}
			]
		},
		{
			"height": 3000,
			"ledgeMinDistance": 600,
			"ledgeMaxDistance": 800,
			"ledges": [
				{
					"id": "ledge",
					"ratio": 3
				},
				{
					"id": "ledge-good-money",
					"ratio": 1
				},
				{
					"id": "ledge-bad-money-alt",
					"ratio": 1
				}
			],
			"fallingObjects": [
				{
					"id": "good-01",
					"count": 1
				},
				{
					"id": "good-02",
					"count": 1
				},
				{
					"id": "good-03",
					"count": 1
				},
				{
					"id": "bad-01",
					"count": 1
				},
				{
					"id": "star",
					"count": 1
				}
			]
		},
		{
			"height": 3000,
			"ledgeMinDistance": 600,
			"ledgeMaxDistance": 800,
			"ledges": [
				{
					"id": "ledge",
					"ratio": 3
				},
				{
					"id": "ledge-good-money-alt",
					"ratio": 1
				},
				{
					"id": "ledge-bad-time",
					"ratio": 2
				}
			],
			"fallingObjects": [
				{
					"id": "good-01",
					"count": 1
				},
				{
					"id": "good-02",
					"count": 1
				},
				{
					"id": "good-03",
					"count": 1
				},
				{
					"id": "bad-02",
					"count": 1
				}
			]
		},
		{
			"height": 3000,
			"ledgeMinDistance": 500,
			"ledgeMaxDistance": 700,
			"ledges": [
				{
					"id": "ledge",
					"ratio": 3
				},
				{
					"id": "ledge-good-time",
					"ratio": 1
				},
				{
					"id": "ledge-bad-money",
					"ratio": 2
				}
			],
			"fallingObjects": [
				{
					"id": "good-01",
					"count": 1
				},
				{
					"id": "good-02",
					"count": 1
				},
				{
					"id": "good-03",
					"count": 1
				},
				{
					"id": "bad-03",
					"count": 1
				}
			]
		},
		{
			"height": 3000,
			"ledgeMinDistance": 500,
			"ledgeMaxDistance": 700,
			"ledges": [
				{
					"id": "ledge",
					"ratio": 2
				},
				{
					"id": "ledge-good-money",
					"ratio": 1
				},
				{
					"id": "ledge-bad-money-alt",
					"ratio": 2
				}
			],
			"fallingObjects": [
				{
					"id": "good-01",
					"count": 1
				},
				{
					"id": "good-02",
					"count": 1
				},
				{
					"id": "good-03",
					"count": 1
				},
				{
					"id": "bad-01",
					"count": 1
				},
				{
					"id": "star",
					"count": 1
				}
			]
		},
		{
			"height": 3000,
			"ledgeMinDistance": 500,
			"ledgeMaxDistance": 700,
			"ledges": [
				{
					"id": "ledge",
					"ratio": 1
				},
				{
					"id": "ledge-good-money-alt",
					"ratio": 1
				},
				{
					"id": "ledge-bad-time",
					"ratio": 2
				}
			],
			"fallingObjects": [
				{
					"id": "good-01",
					"count": 1
				},
				{
					"id": "good-02",
					"count": 1
				},
				{
					"id": "good-03",
					"count": 1
				},
				{
					"id": "bad-02",
					"count": 1
				}
			]
		},
		{
			"height": 3000,
			"ledgeMinDistance": 400,
			"ledgeMaxDistance": 600,
			"ledges": [
				{
					"id": "ledge",
					"ratio": 1
				},
				{
					"id": "ledge-good-time",
					"ratio": 1
				},
				{
					"id": "ledge-bad-money",
					"ratio": 2
				}
			],
			"fallingObjects": [
				{
					"id": "good-01",
					"count": 1
				},
				{
					"id": "good-02",
					"count": 1
				},
				{
					"id": "good-03",
					"count": 1
				},
				{
					"id": "bad-03",
					"count": 1
				}
			]
		},
		{
			"height": 3000,
			"ledgeMinDistance": 400,
			"ledgeMaxDistance": 600,
			"ledges": [
				{
					"id": "ledge",
					"ratio": 1
				},
				{
					"id": "ledge-good-money",
					"ratio": 1
				},
				{
					"id": "ledge-bad-money-alt",
					"ratio": 3
				}
			],
			"fallingObjects": [
				{
					"id": "good-01",
					"count": 1
				},
				{
					"id": "good-02",
					"count": 1
				},
				{
					"id": "good-03",
					"count": 1
				},
				{
					"id": "bad-01",
					"count": 1
				}
			]
		},
		{
			"height": 3000,
			"ledgeMinDistance": 400,
			"ledgeMaxDistance": 600,
			"ledges": [
				{
					"id": "ledge",
					"ratio": 1
				},
				{
					"id": "ledge-bad-time",
					"ratio": 3
				}
			],
			"fallingObjects": [
				{
					"id": "good-01",
					"count": 1
				},
				{
					"id": "good-02",
					"count": 1
				},
				{
					"id": "good-03",
					"count": 1
				},
				{
					"id": "bad-02",
					"count": 1
				}
			]
		},
		{
			"height": 3000,
			"ledgeMinDistance": 400,
			"ledgeMaxDistance": 600,
			"ledges": [
				{
					"id": "ledge-bad-money",
					"ratio": 1
				}
			],
			"fallingObjects": [
				{
					"id": "good-01",
					"count": 1
				},
				{
					"id": "good-02",
					"count": 1
				},
				{
					"id": "good-03",
					"count": 1
				},
				{
					"id": "bad-03",
					"count": 1
				}
			]
		}
	]
}
