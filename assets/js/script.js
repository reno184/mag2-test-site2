/**************************************     FACTORY FUNCTIONS      *******************************************/
function CreateOurProcessData(){
    return [
        {title : "Installation", content : "Install Creation, our tutorial video will guide you to create your digital product catalog."},
        {title : "Publish", content : "Publish your product catalog to Shopman with one click and start selling."},
        {title : "Receive orders", content : "Your Creation will receive orders from Shopman users."},
        {title : "Productions", content : "After your production is completed, delivery the goods to Mag²'s warehouse. Mag² checks it out, pays you the balance and ends the transaction."},
        {title : "Sales network", content : "Your products wil appear in thousands of Asian stores. Your sales network is set."}
    ]
}

function CreateSizeDetector(){
    let _size;
    let _visibleCol;
    const _sizeDetector = function() {
        const elements = document.querySelectorAll("#sizeDetector div");
        for (let ele of elements) {
            if (window.getComputedStyle(ele).display === 'block') {
                _size = ele.id
                _visibleCol = parseInt(ele.dataset.col)
            }
        }
    }
    _sizeDetector()
    return{
        size: _size,
        visibleCol: _visibleCol
    }
}

function CreatePosition(carousel, btnNav, visibleCol,originalTab){
    let position = 0;
    const slice = function(){
        console.log(visibleCol)
        const tabSliced = originalTab.slice(position, visibleCol + position);
        carousel.react(tabSliced)
        btnNav.react(position)
    }
    slice()
    return{
        next : function (e){
            e.preventDefault()
            const btn = e.currentTarget;
            if(!btn.getAttribute('disabled')){
                position++
                slice()
            }
        },
        prev : function(e){
            e.preventDefault()
            const btn = e.currentTarget;
            if(!btn.getAttribute('disabled')) {
                position--
                slice()
            }
        }
    }
}

function CreateNavButton(idPrevBtn, idNextBtn, visibleCol, originalTab){
    const btnPrev = document.getElementById(idPrevBtn);
    const btnNext = document.getElementById(idNextBtn);

    return {
        trigger : function (position){
            btnPrev.addEventListener('click', position.prev)
            btnNext.addEventListener('click', position.next)
        },
        react : function(position){
            if (position === 0) {
                btnPrev.style.opacity= .3
                btnPrev.setAttribute('disabled', 'true')
            } else {
                btnPrev.style.opacity=1
                btnPrev.removeAttribute('disabled')
            }
            if (position + visibleCol === originalTab.length) {
                btnNext.style.opacity= .3
                btnNext.setAttribute('disabled', 'true')
            } else {
                btnNext.style.opacity=1
                btnNext.removeAttribute('disabled')
            }
        }
    }
}

function CreateCarousel(carouselId){
    return{
        react : function(newTabs){

            const panel = d3.select('#'+carouselId)
            const cols = panel.selectAll('.col-12').data(newTabs)
            const contents = panel.selectAll('.content').data(newTabs)


            cols.enter().append("div").attr("class", "col-12 col-sm-6 col-md-4 col-lg-3")
                .html((d)=>{
                    return `  
                         <svg width="80%" height="40px"  fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="15" fill="#F4D509" ></circle>
                            <path stroke="#F4D509" stroke-linecap="round" stroke-width="2" d="M900 15L60 15"/>
                        </svg>
                        <div class="content">
                          <div class="agHeader2 mt-2">${d.title}</div>
                            <div class="agDescriptionText">${d.content}</div>
                        </div>`
                })
            cols.exit().remove();

            contents.merge(contents)
                .style("opacity", 0)
                .html((d)=>{
                    return `
                        <div class="agHeader2 mt-2">${d.title}</div>
                        <div class="agDescriptionText">${d.content}</div>
                      `
                })
                .transition()
                .delay(function(d, i) {
                    return i * 100;
                })
                .duration(300)
                .style("opacity", 1);
        }
    }
}

/**************************************     INIT WINDOW EVENTS      *******************************************/
const sizeDetector = CreateSizeDetector()

/**************************************     INIT --OUR PROCESS-- CAROUSEL      *******************************************/

const dataProcess = CreateOurProcessData()

const carouselProcess = CreateCarousel('carouselProcess')

const btnNavProcess = CreateNavButton('btnPrevProcess', 'btnNextProcess',sizeDetector.visibleCol, dataProcess)

const position = CreatePosition(carouselProcess, btnNavProcess,sizeDetector.visibleCol, dataProcess)

btnNavProcess.trigger(position)
