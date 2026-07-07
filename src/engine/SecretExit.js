const SecretExit = {

    seed: null,
    combo: null,

    modifiers: [
        ["Control", "Shift"],
        ["Control", "Alt"],
        ["Shift", "Alt"]
    ],

    keys: [
        ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        ..."0123456789",
        "F1","F2","F3","F4","F5","F6",
        "F7","F8","F9","F10","F11","F12"
    ],

    createSeed(){

        this.seed =
            Math.floor(Math.random()*999999999);

        return this.seed;

    },

    random(seed){

        let x = Math.sin(seed) * 10000;

        return x - Math.floor(x);

    },

    generate(){

        if(this.seed === null){

            this.createSeed();

        }

        const modifierIndex =
            Math.floor(
                this.random(this.seed) *
                this.modifiers.length
            );

        const keyIndex =
            Math.floor(
                this.random(this.seed+1) *
                this.keys.length
            );

        this.combo = {

            modifiers:
                this.modifiers[modifierIndex],

            key:
                this.keys[keyIndex]

        };

        console.log("SECRET SEED:",this.seed);
        console.log("SECRET COMBO:",this.combo);

    },

    reset(){

        this.seed = null;
        this.combo = null;

    },

    getCombo(){

        return this.combo;

    }

};