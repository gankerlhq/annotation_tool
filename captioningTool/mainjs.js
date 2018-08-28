value=-1;
var obj=JSON.parse(data);
var objF=JSON.parse(dataF);
var arr=createArray(0,0);

function done(choice){
	if (value!=-1)
		finishCaptioning()
	if (choice==1)
		value += 1
	if (choice==0)
		value -= 1
	if (value < 0)
		value = 0
	nextDisplay()
}

function finishCaptioning(){
  var text1 = document.getElementById("caption1").value;
  var text2 = document.getElementById("caption2").value;
  var text3 = document.getElementById("caption3").value;
  var text4 = document.getElementById("caption4").value;
  var text5 = document.getElementById("caption5").value;
  var id=document.getElementById("imgID").innerHTML;
	//DONE
	loadCaptionsToArray(id, text1, text2, text3, text4, text5)
}

function loadCaptionsToArray(id, tx1, tx2, tx3, tx4, tx5){
	tmp = ["",tx1,tx2,tx3,tx4,tx5]
	var checkExisted = isIdExisted(id) // DONE

	if (checkExisted!=-1)
		for (i = 1; i<6; i++)
			arr[checkExisted][i] = tmp[i]
	else
			arr.push([id,tx1,tx2,tx3,tx4,tx5])

}

function isIdExisted(id){
	for (i=0; i<arr.length;i++)
		if (id==arr[i][0])
			return i
	return -1
}

function nextDisplay(){
	nextInfo = getNextValue()
	nexImagesAndID(nextInfo[0])
	nextTextBoxes(nextInfo)
}

function getNextValue(){
	mainPart = obj[0]["images"]
	var index = 0
	if (value<arr.length)
			return [arr[value][0], arr[value][1], arr[value][2], arr[value][3], arr[value][4], arr[value][5]]
	else
			while (index<mainPart.length)
			{
				currID = mainPart[index]["id"]
				if (isIdExisted(currID) == -1)
					if (checkFilteringCondition(currID))
						return [currID,"","","","",""]
						index++
			}
}

function checkFilteringCondition(id){
	var listID = loadFilteredIdToArray()
	for (j = 0; j < listID.length; j++)
		if (id == listID[j])
			return true
	return false
}

function loadFilteredIdToArray(){
	tmp=[]
	for (i = 0; i < objF.length; i++)
		tmp.push(objF[i]["id"])
	return tmp
}

function nexImagesAndID(info){
	document.getElementById("imgID").innerHTML=info;
	document.getElementById("currImage").src=findImgLink(info);
}

function findImgLink(info){
	mainPart = obj[0]["images"]
	for (i = 0; i < mainPart.length ; i++)
		if (mainPart[i]["id"]==info)
			return mainPart[i]["flickr_url"]
}

function nextTextBoxes(currVal){
		document.getElementById("caption1").value=currVal[1]
		document.getElementById("caption2").value=currVal[2]
		document.getElementById("caption3").value=currVal[3]
		document.getElementById("caption4").value=currVal[4]
		document.getElementById("caption5").value=currVal[5]
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;
    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
}

function saveTextAsFile() {
  var element = document.createElement('a');
  var text=""
	text=text+"data='["
	text=text+handlingCaption()
	text=text+"]'"
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  var filename="fileINead.json"
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function handlingCaption(){
	var result=""
	for (i=0;i<arr.length;i++)
		for(j=1;j<6;j++)
			if (arr[i][j] != "")
				if (i!=arr.length - 1)
					result=result+"{\"image_id\": "+arr[i][0]+", \"caption\": \""+arr[i][j]+"\"}, "
				else
					result=result+"{\"image_id\": "+arr[i][0]+", \"caption\": \""+arr[i][j]+"\"}"
	return result
}

//TODO: LOAD CAPTIONED FILE; SAVE FILE INSTEAD OF DOWNLOAD; LOAD FILE NAME ISTEAD OF LINK; PUSH FILE TO GITHUB
