import fs from 'fs';

let text = fs.readFileSync('src/assets/tiles_list_v1.4').toString();
let lines = text.split('\n').filter(line => line.trim() !== '');
console.log(lines);
let frames = [];
lines.forEach(line => {
   let parts = line.split(' ');
   if(parts[5] >= 1) {
        for(let i = 0; i<parts[5]; i++){
            let frame = {
                filename: parts[0] + '_' + i,
                frame: {x:parseInt(parts[1])+parseInt(parts[3])*i,y:parts[2],w:parts[3],h:parts[4]},
                rotated: false,
                trimmed: false,
                spriteSourceSize: {x:0,y:0,w:parts[3],h:parts[4]},
                sourceSize: {w:parts[3],h:parts[4]},
                pivot: {x:0.5,y:0.5}
            }
            frames.push(frame);
        }
    } else {
        let frame = {
            filename: parts[0],
            frame: {x:parts[1],y:parts[2],w:parts[3],h:parts[4]},
            rotated: false,
            trimmed: false,
            spriteSourceSize: {x:0,y:0,w:parts[3],h:parts[4]},
            sourceSize: {w:parts[3],h:parts[4]},
            pivot: {x:0.5,y:0.5}
        }
        frames.push(frame);
    }
});
let object = {
    frames: frames,
    meta: {
        app: "http://www.codeandweb.com/texturepacker",
        version: "1.0",
        image: "0x72_DungeonTilesetII_v1.4.png",
        format: "RGBA8888",
        size: {"w":512,"h":512},
        scale: "1",
        smartupdate: "$TexturePacker:SmartUpdate:5e8f90752cfd57d3adfb39bcd3eef1b6:87d98cec6fa616080f731b87726d6a1e:b55588eba103b49b35a0a59665ed84fd$"
    }
}
let json = JSON.stringify(object);
fs.writeFileSync('tiles.json', json);