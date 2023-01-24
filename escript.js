function getformatTime(){
    const now = new Date().toLocaleTimeString('en-us',{
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
    console.log(now);
    const date = now.split(',')[0].split(' ');
    const time = now.split(',')[1];
    return ` ${date[1]} ${date[0]}, ${time} `;
 

}


document.querySelector('#add_value').addEventListener('submit', function(e)
{
    e.preventDefault();
    console.log('form-sunmitted');

    const type = document.querySelector('.select_value').value;
    const dcs = document.querySelector('.description').value;
    const vlu = document.querySelector('.amount_add').value;

    if(dcs.length > 0 && vlu.length > 0){
        addItems(type, dcs, vlu);
        resetForm();
    };
     
    

});
// ..........................no...........................................
    showItems();
     function showItems(){
        let item = getItemsfromLS();
        const collection = document.querySelector('.collection');
        

        for(let items of item){

            const newHtml = `
            <div class = "item">
                <div class="item-description-time">
                    <div class= "item-description">
                        <p>${items.dcs}</p>
                    </div>
                    <div class="item-time">
                        <p>${items.timevl}</p>
                    </div>
                </div>
                <div class="item-amount ${items.type === '+' ? 'income-amount' 
                                             : 'expenses-amount' }">
                    <p>${items.type}$${items.vlu}</p>
                </div>
                <button type="delete" class="btncross">
                 <i class="fa fa-times" aria-hidden="true"></i>
                 </button>
                
            </div>
                `;

            
            //     var button = document.createElement("button");
            //     button.innerHTML = "CROSS";
            // newHtml.append(button);
                collection.insertAdjacentHTML('afterbegin', newHtml);
            }
               

     }
    //  button.addEventListener("click", function(){

    //  })
                  

    // 
    //  ..........................no......................................

        function addItems(type, dcs, vlu){

            const timevl = getformatTime();

            const newHtml = `
                <div class = "item">
                    <div class="item-description-time">
                        <div class= "item-description">
                            <p>${dcs}</p>
                        </div>
                        <div class="item-time">
                            <p>${timevl}</p>
                        </div>
                    </div>
                    <div class="item-amount ${type === '+' ? 'income-amount' 
                                                 : 'expenses-amount' }">
                        <p>${type}$${vlu}</p>
                        
                    </div>
                    <div>
                    <button type="delete" class="btncross">
                    <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                    </div>
                    
                </div>
                    `;
                    

                    
                    console.log(newHtml);
                    const collection = document.querySelector('.collection');
                    collection.insertAdjacentHTML('afterbegin', newHtml);

                    addItemToLS(type,dcs,vlu,timevl);

                    showTotalIncome();
                    showTotalExp();
                    showTotalBal();
                    // deldata(btncross);


                    // addItemtoLS(type,dcs,vlu,time);

        };
        $(document).ready(function(){
         $('.btncross').click(function(){
          $('.item').remove();
         });
        });
     
      function resetForm(){
        document.querySelector('.select_value').value = '+';
        document.querySelector('.description').value = '';
        document.querySelector('.amount_add').value = '';
         };

         function getItemsfromLS(){

            let item = localStorage.getItem('item');
       
            if(item){
                 item = JSON.parse(item);
            }else{
                 item = [];
            }
       
            return item;
       }


         function addItemToLS(type,dcs,vlu,timevl){ 

            let item = getItemsfromLS();
            item.push({ dcs, timevl,  type, vlu, });
       
            localStorage.setItem('item', JSON.stringify(item));
       
       }

       showTotalIncome();
       function showTotalIncome(){
        let item = getItemsfromLS();
        let totalincome = 0;
        for(let items of item){
            if(items.type === '+'){
                totalincome += parseInt(items.vlu);
            }
        }
        // console.log(totalincome);
        document.querySelector('.income_amount p').innerText = `$${totalincome}`;

       };
       showTotalExp();
       function showTotalExp(){
        let item = getItemsfromLS();
        let totalExpen = 0;
        for(let items of item){
            if(items.type === '-'){
                totalExpen += parseInt(items.vlu);
            }
        }
        // console.log(totalExpen);
        document.querySelector('.expenses_amount p').innerText = `$${totalExpen}`;

       };
       showTotalBal();
       function showTotalBal(){
        let item = getItemsfromLS();
        let totalBal = 0;
        for(let items of item){
            if(items.type === '+'){
                totalBal += parseInt(items.vlu);

            }else{
                totalBal -= parseInt(items.vlu);
            }
        }
        document.querySelector('.total_bal_amount p').innerText = totalBal;

       }
        deldata(btncross)

        