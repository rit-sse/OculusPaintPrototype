pc.script.create('moveCamera', function (context) {
    // Creates a new MoveCamera instance
    var MoveCamera = function (entity) {
        this.entity = entity;
        this.time_since_last_move = 0;
        this.x_pos = 0;
        this.z_pos = 45;
        this.phase = 0;
        this.move = false;

    };

    MoveCamera.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.setLocalPosition(0,0,45);
            context.keyboard.on(pc.input.EVENT_KEYDOWN, this.onKeyDown, this);
            context.keyboard.on(pc.input.EVENT_KEYUP, this.onKeyUp, this);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if(this.move){
                this.time_since_last_move++;
                if(this.time_since_last_move === 10){
                    this.time_since_last_move = 0;
                    if (this.x_pos === 45){
                        this.phase = 1;
                    }
                    else if(this.z_pos === 45){
                        this.phase = 2;
                    }
                    else if(this.x_pos === -45){
                        this.phase = 3;
                    }
                    else if(this.z_pos === -45){
                        this.phase = 4;
                    }
                    
                    switch(this.phase){
                        case 1 :
                            this.x_pos--;
                            this.z_pos++;
                            break;
                        case 2 :
                            this.z_pos--;
                            this.x_pos--;
                            break;
                        case 3 : 
                            this.z_pos--;
                            this.x_pos++;
                            break;
                        case 4 :
                            this.z_pos++;
                            this.x_pos++;
                            break;
                    }
                    this.entity.setLocalPosition(this.x_pos,0,this.z_pos);
                    this.entity.rotateLocal(0,-2,0);
                    console.log("X: " + this.x_pos + " Z: " + this.z_pos);
                }
            }

        },
        onKeyDown: function (event){
            //console.log(event.key);
            if (event.key ===  67){
                this.move = !this.move;
            }
        },
        
        
        onKeyUp: function (event){
            
        }
        
    };

    return MoveCamera;
});