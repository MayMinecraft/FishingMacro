/// <reference types="../../CTAutocomplete" />

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
const EntityFishHook = Java.type("net.minecraft.entity.projectile.EntityFishHook") // a bobber
const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement")
const C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation")

var PlayerBobberX = undefined
var PlayerBobberZ = undefined
var fishing = false
var fishingTime = undefined

export const DetectFish = register("step", () => {
    World.getAllEntitiesOfType(EntityArmorStand).forEach((fish) => {
        let standname = fish.getName()?.removeFormatting()

        if (standname === '!!!' && !fishing) {
            fishing = true
            ReelIn()
            setTimeout(() => {
                fishing = false
            }, 3000)
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
    }, 200)
}

function Reel() {
    const item = Player.getHeldItem();
    if (item?.getID() !== 346 || !IsAllowed()) return

    Client.sendPacket(new C08PacketPlayerBlockPlacement(item.itemStack))
    Client.sendPacket(new C0APacketAnimation())
}