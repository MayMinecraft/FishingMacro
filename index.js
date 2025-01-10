/// <reference types="../CTAutocomplete" />
import { DetectFish } from "./features/macro";

const toggleKeybind = new KeyBind("Toggle Macro", Keyboard.KEY_NONE, "Fishing Macro")

toggleKeybind.registerKeyDown(ToggleDown);
toggleKeybind.registerKeyRelease(ToggleUP);

let enabled = false
let KeybindDown = false

function toggleMacro() {
    if (enabled) {
        DetectFish.unregister()
        enabled = false
        ChatLib.chat(" &d[&bFishingMacro&d]&r &ecurrently&r &c&l[Disabled]")
    } else {
        DetectFish.register()
        enabled = true
        ChatLib.chat(" &d[&bFishingMacro&d]&r &ecurrently&r &a&l[Enabled]")
    }
}

function ToggleDown() {
    if (!KeybindDown) toggleMacro()
    KeybindDown = true;
}

function ToggleUP() {
    KeybindDown = false
}

register('command', () => {
    toggleMacro()
}).setName('fishingmacro').setAliases('fm')