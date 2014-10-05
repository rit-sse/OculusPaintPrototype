pc.script.create('echaskech', function (context) {
    // Creates a new Echaskech instance
    var Echaskech = function (entity) {
        this.entity = entity;
        this.x_pos = 0;
        this.y_pos = 0;
        this.z_pos = 0;
    };

    Echaskech.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.redMaterial = context.assets.getAssetByName('Red', pc.asset.ASSET_MATERIAL);
            context.keyboard.on(pc.input.EVENT_KEYDOWN, this.onKeyDown, this);
            context.keyboard.on(pc.input.EVENT_KEYUP, this.onKeyUp, this);
            this.drawLine([0,0,0],[5,0,0]);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        },
        
        onKeyDown: function (event){
            if (event.key ===  37){
                this.x_pos -= 1;
                this.spawnCube(this.x_pos,this.y_pos,this.z_pos);
                //left
            }
            else if (event.key === 39){
                this.x_pos += 1;
                this.spawnCube(this.x_pos,this.y_pos,this.z_pos);
                //right
            }
            else if (event.key === 38){
                this.y_pos += 1;
                this.spawnCube(this.x_pos,this.y_pos,this.z_pos);
                //up
            }
            else if (event.key === 40){
                this.y_pos -= 1;
                this.spawnCube(this.x_pos,this.y_pos,this.z_pos);
                //down
            }
            else if (event.key ===88){
                this.z_pos -= 1;
                this.spawnCube(this.x_pos,this.y_pos,this.z_pos);
                //x key in
            }
            else if (event.key === 90){
                this.z_pos += 1;
                this.spawnCube(this.x_pos,this.y_pos,this.z_pos);
                //z key out
            }
        },
        
        
        onKeyUp: function (event){
            
        },
        
        drawLine: function (start, stop){
            
            var xs = start[0];
            var ys = start[1];
            var zs = start[2];
            
            var xf = stop[0];
            var yf = stop[1];
            var zf = stop[2];

            var x_state = [];
            var y_state = [];
            var z_state = [];

            var x_size;
            var y_size;
            var z_size;

            var longest = 0;

            var x_ratio;
            var y_ratio;
            var z_ratio;

            for(pos_x = xs; pos_x <= xf; pos_x++){
                x_state.push(pos_x);
            }
            x_size = x_state.length

            for(pos_y = ys; pos_y <= yf; pos_y++){
                y_state.push(pos_y);
            }
            y_size = y_state.length

            for(pos_z = zs; pos_z <= zf; pos_z++){
                z_state.push(pos_z);
            }
            z_size = z_state.length

            if (x_size > y_size){
                if (x_size > z_size){
                    longest = x_size;
                }
                else{
                    longest = z_size;
                }
            }
            else{
                if (y_size > z_size){
                    longest = y_size;
                }
                else{
                    longest = z_size;
                }
            }

            x_ratio = x_size/longest;
            y_ratio = y_size/longest;
            z_ratio = z_size/longest;
            
            console.log("Longest: " + longest);
            console.log("x ratio: " + x_ratio + " " + x_state);
            console.log("y ratio: " + y_ratio + " " + y_state);
            console.log("z ratio: " + z_ratio + " " + z_state);
            
            for (pos = 0; pos < longest; pos++){
                var x = x_state[Math.floor(pos * x_ratio)];
                var y = y_state[Math.floor(pos * y_ratio)];
                var z = z_state[Math.floor(pos * z_ratio)];
                console.log("Loop: X: " + x + " Y: " + y + " Z: " + z);
                this.spawnCube(x,y,z);
                    
            }

        },
        
        
        spawnCube: function (x,y,z) {
            var entity = new pc.fw.Entity();
            
            context.systems.model.addComponent(entity, {
                type: 'box',
                materialAsset: this.redMaterial
            });
            
            entity.setLocalPosition(x,y,z);
            
            context.root.addChild(entity);
        }
    };

    return Echaskech;
});