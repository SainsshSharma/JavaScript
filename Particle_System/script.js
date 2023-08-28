let canvas=document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let ctx=canvas.getContext('2d');

color=['#061115','#124848','#3f5a53','#94745b','#911d20']

var speed=1.5;

const mouse={
    x:undefined,
    y:undefined,
    radius:150,
}

window.addEventListener('mousemove',(e)=>{
    mouse.x=e.x;
    mouse.y=e.y;
});


function Particles(x,y,dx,dy,size)
{
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.size=size;
    this.colorIdx=parseInt(Math.random()*color.length);
    this.maxSize=10;
    this.defaultSize=2;

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

        let disX=this.x-mouse.x;
        let disY=this.y-mouse.y;

        let distance=Math.sqrt(disX*disX+disY*disY);

        if(distance<mouse.radius)
        {
            if(this.size<this.maxSize)
            {
                this.size+=0.2;
            }
            else if(this.size>this.defaultSize)
            {
                this.size-=0.01
            }
        }
        else
        {
            this.size=2;
        }
    }
    
}        

function Connect()
{
    for(let i=0;i<particles.length;i++)
    {
        for(let j=i;j<particles.length;j++)
        {
            let dx=particles[i].x-particles[j].x;
            let dy=particles[i].y-particles[j].y;

            let distance=Math.sqrt(dx*dx+dy*dy);

            if(distance<100)
            {
                let gradient = ctx.createLinearGradient(particles[i].x, 0, particles[j].x, 0);
                gradient.addColorStop(0,color[particles[i].colorIdx]);                
                gradient.addColorStop(1,color[particles[j].colorIdx]);

                ctx.strokeStyle=gradient;
                ctx.lineWidth=1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x,particles[i].y);
                ctx.lineTo(particles[j].x,particles[j].y);
                ctx.stroke();
                ctx.closePath();
            }

        }
    }
}

var particles=[];

for(let i=0;i<200;i++)
{
    let x=Math.random()*canvas.width;
    let y=Math.random()*canvas.height;

    let dx=(Math.random()-0.5)*speed;
    let dy=(Math.random()-0.5)*speed;

    let size=2;

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

    Connect()  

}        

animate();

