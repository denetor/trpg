import {Color, Font, FontUnit, vec} from "excalibur";

export const Config = {
    font: {
        ephemeralMessage: new Font({
            family: 'monospace',
            size: 7,
            bold: true,
            unit: FontUnit.Px,
            color: Color.Green,
            shadow: {
                blur: 1,
                offset: vec(2, 2),
                color: Color.Black,
            },
        })
    },
    game: {
        // under this distance, consider the player nearby
        closePlayerDistance: 100,
    }
}