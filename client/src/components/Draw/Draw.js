import React, {Component} from 'react';

import './Draw.css';

class Draw extends Component{
    constructor(props){
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
        this.erase = this.erase.bind(this);
    }

    isPainting = false;

    penColor = '#EBF5F5';
    line = [];
    prevPos = {offsetX : 0, offsetY : 0 };

    onMouseDown({ nativeEvent}){
        const {offsetX,offsetY} = nativeEvent;
        this.isPainting = true;
        this.prevPos = {offsetX,offsetY};
    }

    onMouseMove({ nativeEvent}){
        if(this.isPainting){
            const {offsetX,offsetY} = nativeEvent;
            const offSetData = {offsetX,offsetY};
            
            const positionData= {
                start : {...this.prevPos},
                stop : {...offSetData},
            };
            this.line = this.line.concat(positionData);
            this.paint(this.prevPos,offSetData,this.penColor);
        }
    }

    endPaintEvent(){
        if(this.isPainting){
            this.isPainting = false;
        }
    }


    static getLine = () => {
        return this.line;
    }

    paint(prevPos,currPos, strokeStyle){
        const {offsetX,offsetY} = currPos;
        const {offsetX : x,offsetY : y} = prevPos;
        
        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;

        this.ctx.moveTo(x,y);

        this.ctx.lineTo(offsetX,offsetY);

        this.ctx.stroke();
        this.prevPos = {offsetX,offsetY};
    }


    componentDidMount(){
        this.canvas.width = 650;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 2;
    }

    erase(){
        var index;
        for(index = 0;index < this.line.length;index++){
            this.ctx.lineWidth = 10;
            this.paint(this.line[index].start,this.line[index].stop,'black');
            this.ctx.lineWidth = 2;
        }
    }

    render(){
        return(
            <div className ='drawContainer'>
                <canvas
                ref={(ref) => (this.canvas = ref)}
                style={{ background: 'black' }}
                onMouseDown={this.onMouseDown}
                onMouseLeave={this.endPaintEvent}
                onMouseUp={this.endPaintEvent}
                onMouseMove={this.onMouseMove}
                />
                <div>
                    <button className ='eraseButton' onClick = {this.erase} >Effacer</button>
                </div>
            </div>
        );
    }
}
;
    export default Draw;