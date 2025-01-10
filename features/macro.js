/// <reference types="../../CTAutocomplete" />

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement")
const C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation")
const EntityFishHook = Java.type("net.minecraft.entity.projectile.EntityFishHook") // a bobber

var PlayerBobberX = undefined
var PlayerBobberZ = undefined
var fishingTime = undefined
var fishing = false

let playerYawDist = 0
let playerPitchDist = 0

export const DetectFish = register("step", () => {
    World.getAllEntitiesOfType(EntityArmorStand).forEach((fish) => {
        let standname = fish.getName()?.removeFormatting()

        if (standname === '!!!' && !fishing) {
            fishing = true
            ReelIn()
            setTimeout(() => {
                fishing = false
            }, 500)
        }
    })
}).setFps(20).unregister()

function IsAllowed() {
    const currentGui = Client.getMinecraft().field_71462_r
    if (!currentGui || currentGui?.getClass()?.getSimpleName?.().includes('GuiChat')) return true

    return false
}

function ReelIn() {
    if (!IsAllowed()) return
    Reel()
    setTimeout(() => {
        Reel()
        rotate()

    }, 200)
}

export function reset(){
    playerYawDist = 0
    playerPitchDist = 0
}

function Reel() {
    const item = Player.getHeldItem();
    if (item?.getID() !== 346 || !IsAllowed()) return

    Client.sendPacket(new C08PacketPlayerBlockPlacement(item.itemStack))
    Client.sendPacket(new C0APacketAnimation())
}

function rotate(){
    playerYawDist < 0 ? playerYawDist = playerYawDist + getRandomInt() : playerYawDist = playerYawDist - getRandomInt()
    playerPitchDist < 0 ? playerPitchDist = playerPitchDist + getRandomInt() : playerPitchDist = playerPitchDist - getRandomInt()

    const player = Player.getPlayer()

    player.field_70177_z = (player.field_70177_z + playerYawDist)
    player.field_70125_A = (player.field_70125_A + playerPitchDist)
}

function getRandomInt() {
    return Math.floor(Math.random() * 30) / 10
}
