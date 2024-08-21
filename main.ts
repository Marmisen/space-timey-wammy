radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 10) {
        EB4 = 5
        led.plot(4, 3)
    }
    if (receivedNumber == 20) {
        EB3 = 5
        led.plot(4, 2)
    }
    if (receivedNumber == 30) {
        EB2 = 5
        led.plot(4, 1)
    }
    if (receivedNumber == 40) {
        EB1 = 5
        led.plot(4, 0)
    }
    if (receivedNumber == 50) {
        Lose = 2
    }
})
input.onButtonPressed(Button.A, function () {
    if (!(Player_Spot > 2)) {
        Player_Spot += 1
    }
})
input.onButtonPressed(Button.AB, function () {
    if (Bullets > 0) {
        Bullets += -1
        if (Player_Spot == 0) {
            if (FB1 == 0) {
                FB1 = 1
                led.plot(1, 0)
            }
        } else if (Player_Spot == 1) {
            if (FB2 == 0) {
                FB2 = 1
                led.plot(1, 1)
            }
        } else if (Player_Spot == 2) {
            if (FB3 == 0) {
                FB3 = 1
                led.plot(1, 2)
            }
        } else {
            if (FB4 == 0) {
                FB4 = 1
                led.plot(1, 3)
            }
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (!(Player_Spot < 1)) {
        Player_Spot += -1
    }
})
let Move_Cooldown = 0
let Bullet_Cooldown = 0
let FB4 = 0
let FB3 = 0
let FB2 = 0
let FB1 = 0
let EB1 = 0
let EB2 = 0
let EB3 = 0
let EB4 = 0
let Bullets = 0
let Lose = 0
let Player_Spot = 0
Player_Spot = 1
Lose = 0
Bullets = 3
basic.forever(function () {
    led.plot(0, Player_Spot)
    led.unplot(0, Player_Spot + 1)
    led.unplot(0, Player_Spot + 2)
    led.unplot(0, Player_Spot - 1)
    led.unplot(0, Player_Spot - 2)
    if (Bullet_Cooldown > 30) {
        Bullet_Cooldown = 0
        if (!(Bullets > 2)) {
            Bullets += 1
        }
    }
    if (Lose == 1) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
        music.play(music.tonePlayable(220, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(175, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(147, music.beat(BeatFraction.Breve)), music.PlaybackMode.UntilDone)
    } else if (Lose == 2) {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `)
        music.play(music.tonePlayable(523, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(659, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(880, music.beat(BeatFraction.Breve)), music.PlaybackMode.UntilDone)
    }
})
basic.forever(function () {
    if (Bullets == 3) {
        led.plot(0, 4)
        led.plot(1, 4)
        led.plot(2, 4)
    } else if (Bullets == 2) {
        led.plot(0, 4)
        led.plot(1, 4)
        led.unplot(2, 4)
    } else if (Bullets == 1) {
        led.unplot(2, 4)
        led.unplot(1, 4)
        led.plot(0, 4)
    } else {
        led.unplot(1, 4)
        led.unplot(0, 4)
        led.unplot(2, 4)
    }
})
basic.forever(function () {
    if (Move_Cooldown > 6) {
        Move_Cooldown = 0
        if (FB1 != 0) {
            FB1 += 1
            led.plot(FB1, 0)
            led.unplot(FB1 - 1, 0)
            if (FB1 > 4) {
                FB1 = -2
                radio.sendNumber(10)
            }
        }
        if (FB2 != 0) {
            FB2 += 1
            led.plot(FB2, 1)
            led.unplot(FB2 - 1, 1)
            if (FB2 > 4) {
                FB2 = -2
                radio.sendNumber(20)
            }
        }
        if (FB3 != 0) {
            FB3 += 1
            led.plot(FB3, 2)
            led.unplot(FB3 - 1, 2)
            if (FB3 > 4) {
                FB3 = -2
                radio.sendNumber(30)
            }
        }
        if (FB4 != 0) {
            FB4 += 1
            led.plot(FB4, 3)
            led.unplot(FB4 - 1, 3)
            if (FB4 > 4) {
                FB4 = -2
                radio.sendNumber(40)
            }
        }
        if (EB1 < FB1) {
            EB1 = 0
            FB1 = 0
            led.unplot(EB1, 0)
        }
        if (EB2 < FB2) {
            EB2 = 0
            FB2 = 0
            led.unplot(EB2, 1)
        }
        if (EB3 < FB3) {
            EB3 = 0
            FB3 = 0
            led.unplot(EB3, 2)
        }
        if (EB4 < FB4) {
            EB4 = 0
            FB4 = 0
            led.unplot(EB4, 3)
        }
        if (EB1 != 0) {
            EB1 += -1
            led.plot(EB1, 0)
            led.unplot(EB1 + 1, 0)
            if (EB1 < 1) {
                Lose = 1
                radio.sendNumber(50)
            }
        }
        if (EB2 != 0) {
            EB2 += -1
            led.plot(EB2, 1)
            led.unplot(EB2 + 1, 1)
            if (EB2 < 1) {
                Lose = 1
                radio.sendNumber(50)
            }
        }
        if (EB3 != 0) {
            EB3 += -1
            led.plot(EB3, 2)
            led.unplot(EB3 + 1, 2)
            if (EB3 < 1) {
                Lose = 1
                radio.sendNumber(50)
            }
        }
        if (EB4 != 0) {
            EB4 += -1
            led.plot(EB4, 3)
            led.unplot(EB4 + 1, 3)
            if (EB4 < 1) {
                Lose = 1
                radio.sendNumber(50)
            }
        }
    }
})
loops.everyInterval(100, function () {
    Bullet_Cooldown += 1
    Move_Cooldown += 1
})
