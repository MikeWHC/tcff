import React, { Component } from 'react';
import '../sass/info.scss';

class Info extends Component {
  render() {
    return (
        <section className="container">
            <div className="title">關於影展</div>
            <div className="about">
                台北經典影展首屆於2018年舉辦，希望透過經典電影的重新放映，帶領觀影民眾回到1960-2000之間的黃金年代。相較於國內其他影展或電影節活動，台北經典影展破先例的完全以「經典老片」為主軸，選擇了相當數量的影史經典巨作呈現在觀眾眼前。我們深信每部經典作品之所以能成為經典，背後一定有著值得我們細細品味挖掘的細節。
            </div>
            <div className="about"> 台北經典影展彙集國內外經典電影作品，本屆總計有60部確認放映影片，15部募資影片。本影展的使命是為喜歡經典老電影的觀眾提供一個升級的觀影體驗，因此所有放映影片皆取得以最新數位修復技術復原之版本，希望觀眾在緬懷過去的同時，也能享受與時俱進的觀影品質。
            </div>
            <div className="about">本屆有15部影片透過新型態的募資活動，增加觀眾與影展之間的互動。由募資結果決定哪些影片得以重返大螢幕。台北經典影展也希望藉此了解觀眾的喜好，作為下一屆的選片指南。 台北經典影展向經典致敬，並鼓勵對觀眾對經典作品的思考，藉由電影放映及電影賞析文章分享，系統性的帶領觀眾認識經典電影，擴展本地觀影視野，並灌輸欣賞正版影片的正確版權觀念。台北經典影展透過觀眾熟悉的影像，對白和配樂回到過去，引領人們走進時光隧道，感受不同年代的獨特氛圍。本影展期待成為台灣觀眾心目中欣賞經典電影的首選，影迷的年度盛事。</div>
        </section>
    );
  }
}

export default Info;
