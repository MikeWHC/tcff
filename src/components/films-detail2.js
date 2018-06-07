import React, { Component } from 'react';
import $ from 'jquery';
// import Film from './films-detail.json';
// import '../sass/page.scss';
import '../sass/films-detail.scss';
// import dir from '../images/1997_Good_Will_Hunting_dir.jpg';
// import act01 from '../images/1997_Good_Will_Hunting_act01.jpg';
// import act02 from '../images/1997_Good_Will_Hunting_act02.jpg';
// import act03 from '../images/1997_Good_Will_Hunting_act03.jpg';
import img01 from '../images/1997_Good Will Hunting_01.jpg';
import img02 from '../images/1997_Good Will Hunting_02.jpg';
import img03 from '../images/1997_Good Will Hunting_03.jpg';
import img04 from '../images/1997_Good Will Hunting_04.jpg';
import img05 from '../images/1997_Good Will Hunting_05.jpg';

class Filmsdetail2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            films: []
        }
    }
    componentDidUpdate(){
        console.log(this.award)
    }
    componentDidMount(){

        // 連結後端資料
        console.log("match",this.props);
        console.log("query",window.location.search)
        let q = window.location.search;
        let id = q.slice(q.search('=') +1)
        console.log("id",id)
        fetch(`http://192.168.39.110/tcff_php/api/movie/readOne.php?id=${id}`)
         .then((res) => res.json())
         .then((datas) => {
            console.log(datas) 
            this.setState({
             films: datas
         })})

        //  sliider
        var slides = [img01,img02,img03,img04,img05];
        var slideWidth = $(".slide_wrap").width();
        var slideNum=0;
        // console.log(slides[0]);
        //var sildeCount=$(".slides li").length;
        var slideCount = slides.length;
        console.log(slideWidth);

        for(let $i=0; $i< slideCount;$i++){
            console.log(slides[$i])
            $(".slides").append("<li><img src='"+ slides[$i] +"' alt=''></li>")
            $(".pages").append("<li></li>");
        }

        // $(".slide li").width(slideWidth);
        // $(".slide_wrap ul.slides").width(slideWidth*slideCount);
        setWidth();

        $(".pages li").eq(0).css("background","white");
        $(".pages").on("mouseenter","li",function(){
            slideNum=$(this).index();
            moveSlide(slideNum);
        });
        $("#left").click(function(){
            slideNum--;
            if(slideNum<0)slideNum=slideCount-1;
            moveSlide(slideNum);
        });
        $("#right").click(function(){
            slideNum++;
            if(slideNum>=slideCount)slideNum=0;
            moveSlide(slideNum);
        });
        $(window).resize(function(){
            setWidth();
        });
        function setWidth(){
            slideWidth = $(".slide_wrap").width();
            $(".slide li").width(slideWidth);
            $(".slide_wrap ul.slides").width(slideWidth*slideCount);
            moveSlide(slideNum);
        };
        function moveSlide(slideNum){
             var slideMove = 0-slideNum*slideWidth;
            $(".pages li").eq(slideNum).css("background","white")
                .siblings().css("background","transparent");
            $(".slides").css("left",slideMove);
        }
        
         
    }
  render() {
         
    return (
        <div>
            <div className="box3 box">            
                <div className="slide_wrap">
                    <ul className="slides">
                        {/* <li><img src="images/slide1.jpeg" alt=""></li>
                        <li><img src="images/slide2.jpeg" alt=""></li>
                        <li><img src="images/slide3.jpeg" alt=""></li>
                        <li><img src="images/slide4.jpeg" alt=""></li> */}
                    </ul>
                    <ul className="pages">
                        {/* <li></li>
                        <li></li>
                        <li></li>
                        <li></li> */}
                    </ul>
                    <a className="arrow arrow_left" id="left"><i class="fas fa-angle-left"></i></a>
                    <a className="arrow arrow_right" id="right"><i class="fas fa-angle-right"></i></a>
                </div>
            </div>
            
                <div className="box3">               
                    <div className="myfilmname">
                        <h1 id="h01">{this.state.films.release_year}</h1>
                        <div>
                            <h1>{this.state.films.name_zhtw}</h1>
                            <span>{this.state.films.name_en}</span>
                        </div>                       
                    </div>
                    <div className="myfont">
                        <div className="fpg">
                            <div className="l_font">國家</div>
                            <div className="r_font">{this.state.films.country}</div>
                        </div>
                        <div className="fpg">
                            <div className="l_font">片長</div>
                            <div className="r_font">{this.state.films.running_time}分鐘</div>
                        </div>
                        <div className="fpg">
                            <div className="l_font">級別</div>
                            <div className="r_font">{this.state.films.rating}</div>
                        </div>            
                        <a href=""><div className="r_font BGC"><i class="fas fa-plus-circle"></i>  加入我的票夾</div></a>
                    </div>        
                </div>
            
                <section className="container-filmsDetail">                
                    <div className="about">
                        {this.state.films.synopsis}
                    </div>
                    <div className="about"> 
                        {this.state.films.award}
                    </div>
                                       
                </section>
                        
                <section className="box2">
                    <div className="mycontain">
                        <div className="flex dir">
                            <h2>導<br /><br />演</h2>
                            <div className="mycontent cover">                
                                <div className="mycontent-overlay"></div>
                                <img className="mycontent-image" src={this.state.films.cast == undefined ? '' : `${process.env.PUBLIC_URL}/images/${this.state.films.director[0].director_name_en.split(' ').join('_').replace(':', '')}.jpg`} />
                                <div className="mycontent-details fadeIn-bottom">
                                    <h3 className="mycontent-title">{this.state.films.director == undefined ? '' : this.state.films.director[0].director_name_zhtw}</h3>
                                    <h4 className="mycontent-title">{this.state.films.director == undefined ? '' : this.state.films.director[0].director_name_en}</h4>
                                    <hr />
                                    <p className="mycontent-text">{this.state.films.director == undefined ? '' : this.state.films.director[0].director_description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex act">
                            <div className="flex">
                                <h2>主要演員</h2>
                                <div className="mycontent cover">                
                                    <div className="mycontent-overlay"></div>
                                    <img className="mycontent-image" src={this.state.films.cast == undefined ? '' : `${process.env.PUBLIC_URL}/images/${this.state.films.cast[0].cast_name_en.split(' ').join('_').replace(':', '')}.jpg`} />
                                    <div className="mycontent-details fadeIn-bottom">
                                        <h3 className="mycontent-title">{this.state.films.cast == undefined ? '' : this.state.films.cast[0].cast_name_zhtw}</h3>
                                        <h4 className="mycontent-title">{this.state.films.cast == undefined ? '' : this.state.films.cast[0].cast_name_en}</h4>
                                        <hr />
                                        <p className="mycontent-text">{this.state.films.cast == undefined ? '' : this.state.films.cast[0].cast_description}</p>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.films.cast == undefined ? '' : this.state.films.cast.map((c,i) => i==0 ? '' : (
                                    <div className="mycontent cover left">            
                                        <div className="mycontent-overlay"></div>
                                        <img className="mycontent-image" src={`${process.env.PUBLIC_URL}/images/${c.cast_name_en.split(' ').join('_').replace(':', '')}.jpg`} />
                                        <div className="mycontent-details fadeIn-bottom">
                                            <h3 className="mycontent-title">{c.cast_name_zhtw}</h3>
                                            <h4 className="mycontent-title">{c.cast_name_en}</h4>
                                            <hr />
                                            <p className="mycontent-text">{c.cast_description}</p>
                                        </div>
                                    </div>
                                            ))
                            }
                            {/* <div className="mycontent cover left">            
                                    <div className="mycontent-overlay"></div>
                                    <img className="mycontent-image" src={act02} />
                                    <div className="mycontent-details fadeIn-bottom">
                                        <h3 className="mycontent-title">{this.state.films.cast[2].cast_name_zhtw}</h3>
                                        <h4 className="mycontent-title">{this.state.films.cast[2].cast_name_en}</h4>
                                        <hr />
                                        <p className="mycontent-text">{this.state.films.cast[2].cast_description}</p>
                                    </div>
                                </div> */}
                        
                            {/* <div className="mycontent cover left">        
                                    <div className="mycontent-overlay"></div>
                                    <img className="mycontent-image" src={act03} /> 
                                    <div className="mycontent-details fadeIn-bottom">
                                        <h3 className="mycontent-title">{this.state.films.cast[0].cast_name_zhtw}</h3>
                                        <h4 className="mycontent-title">{this.state.films.cast[0].cast_name_en}</h4>
                                        <hr />
                                        <p className="mycontent-text">{this.state.films.cast[0].cast_description}</p>
                                    </div>
                                </div> */}
                        </div>
                    </div>                
                </section>


                <div className="box3 flex">
                    <div id="trapezoid_left">
                        <h2>{this.state.films.date} {this.state.films.day}</h2>
                    </div>            
                    <div id="trapezoid_right">                 
                        <h2>{this.state.films.auditorium}</h2>       
                    </div>        
                </div>

        </div>
    );
  }
}

export default Filmsdetail2;