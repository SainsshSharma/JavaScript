let canvas=document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let ctx=canvas.getContext('2d');

color=['#061115','#124848','#3f5a53','#94745b','#911d20']

function Particles(x,y,dx,dy,size)
{
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.size=size;
    this.colorIdx=parseInt(Math.random()*color.length);

    this.draw=function()
    {                    
        
        ctx.beginPath();
            ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);
            ctx.fillStyle=color[this.colorIdx];
            ctx.fill();
        ctx.closePath();
    }

    this.animate=function()
    {
        this.draw();
        
        if(this.x>canvas.width || this.x<0)
            this.dx*=-1;

        if(this.y>canvas.height || this.y<0)
            this.dy*=-1
        
        this.x+=this.dx;
        this.y+=this.dy;
    }
    
}            

var particles=[];

for(let i=0;i<200;i++)
{
    let x=Math.random()*canvas.width;
    let y=Math.random()*canvas.height;

    let dx=(Math.random()-0.5)*5;
    let dy=(Math.random()-0.5)*5;

    let size=Math.random()*20+10;

    particles.push(new Particles(x,y,dx,dy,size));

}


function animate()
{
    requestAnimationFrame(animate)                
    
    ctx.beginPath();
        ctx.rect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='rgba(255,255,255,0.1)';                        
        ctx.fill();
    ctx.closePath();

    for(let i=0;i<particles.length;i++)
    {
        particles[i].animate();
    }          

}            

animate();

