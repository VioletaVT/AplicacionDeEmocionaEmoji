Prediccion1="";
Prediccion2="";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera= document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML= '<img id="capture_image" src= "'+data_uri+'"/>';
});
}

console.log("ml5.version: ", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/xx7XDUBYv/model.json",Model_loaded);
function Model_loaded(){
    console.log("Modelo Cargado!")
}

function speak(){
    var synth= window.speechSynthesis;
    var speak_data_1= "La primera prediccion es: "+ Prediccion1;
    var speak_data_2= "Y la segunda prediccion es: "+ Prediccion2;
    var UtterThis= new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(UtterThis);
}

function check(){
    img= document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
       }else{
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        Prediccion1=results[0].label;
        Prediccion2=results[1].label;
        speak();}
       if (results[0].label=="feliz"){
        document.getElementById("result_emoji").innerHTML="&#128512";
       };
       if (results[0].label=="triste"){
        document.getElementById("result_emoji").innerHTML="&#128557";
       }; 
       if (results[0].label=="enojado"){
        document.getElementById("result_emoji").innerHTML="&#128545";
       };
       if (results[0].label=="sorpresa"){
        document.getElementById("result_emoji").innerHTML="&#128561";
       };


       if (results[1].label=="feliz"){
        document.getElementById("result_emoji2").innerHTML="&#128512";
       };
       if (results[1].label=="triste"){
        document.getElementById("result_emoji2").innerHTML="&#128557";
       }; 
       if (results[1].label=="enojado"){
        document.getElementById("result_emoji2").innerHTML="&#128545";
       };
       if (results[1].label=="sorpresa"){
        document.getElementById("result_emoji2").innerHTML="&#128561";
       };

       }
