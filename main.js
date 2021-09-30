var prediction_1="";
var prediction_2="";


Webcam.set({
    width: 350, height: 300, image_format: 'png', png_quality:90
});

var camera=document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        console.log("snap1");
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+ data_uri +"'>";
        console.log("snap2")
    });
}

console.log('ml5.version:', ml5.version);
var ml=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_xTWRm5zs/model.json', modelloaded);

function modelloaded(){
    console.log("modelloaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_1="The First Prediction Is "+ prediction_1;
    speak_2="The second Prediction Is "+ prediction_2;
    var utter=new SpeechSynthesisUtterance(speak_1 + speak_2);
    synth.speak(utter);
}

function check(){
    img=document.getElementById("captured_image");
    ml.classify(img, gotresult);
}

function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="cheerful"){
            document.getElementById("update_emoji").innerHTML="&#128522"+"&#128512";
        }
        if(results[1].label=="cheerful"){
            document.getElementById("update_emoji2").innerHTML="&#128522"+"&#128512";
        }
        if(results[0].label=="sad"){
            document.getElementById("update_emoji").innerHTML="&#128532"+"&#128546";
        }
        if(results[1].label=="sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532"+"&#128546";
        }
        if(results[0].label=="angry"){
            document.getElementById("update_emoji").innerHTML="&#128545"+"&#128548";
        }
        if(results[1].label=="angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545"+"&#128548";
        }
        
    }
}