const colorPickerBtn = document.getElementById('colorpick-btn');
const clearAll = document.querySelector('.clear-all');
const colorList = document.querySelector('.all-colors');

// const pickedColors =[];

let pickedColors = JSON.parse(localStorage.getItem('pop-down') || '[]');

const activateEyeDropper = async () => {
    try {
      const eyeDropper = new EyeDropper();
      console.log(eyeDropper);
      
  
  
      const colorCode = await eyeDropper.open();
      console.log(colorCode.sRGBHex);
      //copy to clipboard
      navigator.clipboard.writeText(colorCode.sRGBHex);
      //sending new color code to the array
      pickedColors.push(colorCode.sRGBHex);

      //step 4
      localStorage.setItem('pop-down', JSON.stringify(pickedColors));
      console.log(pickedColors);
      showColor();
    } catch (error) {
      alert("failed")
    }
  };

  const showColor = () => {
    if (pickedColors.length > 0) {
      document.querySelector(".pop-down").style.display = "block";
       colorList.innerHTML = pickedColors
         .map(
           color => `
      
       <li class="color">
          <span class="rectangle" style= "background-color : ${color}"></span>
          <span class="value hex-port">${color}</span>
        </li>
      
      `
         )
        .join('');
      let colors = document.querySelectorAll(".color");
      console.log(colors)
      colors.forEach(li => {
        li.addEventListener('click', (e) => {
          let color = e.target.innerText;
          navigator.clipboard.writeText(color);
          e.target.innerText = "Copied";
          setTimeout(() => (e.target.innerText = color), 1000);
        })
      })
      
      
    } else {
      document.querySelector('.pop-down').style.display = 'none';
    }
  
   
  };

  const clearListOfColors = () => {
    // colorList.innerHTML = "";
    pickedColors.length = 0;
    localStorage.setItem("pop-down", JSON.stringify(pickedColors));
     document.querySelector('.pop-down').style.display = 'none';
  }
  
  //activate colorpicker
  colorPickerBtn.addEventListener('click', activateEyeDropper);
  clearAll.addEventListener('click', clearListOfColors);
      showColor();
  