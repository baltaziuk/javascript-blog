
/* document.getElementById('test-button').addEventListener('click', function(){
const links = document.querySelectorAll('.titles a');
console.log('links:', links);
});*/


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
  optArticleTagsSelector = '.post-tags .list';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  console.log('Link was clicked!');
  console.log(event);

  /*[DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /*[DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector', articleSelector);



  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle', targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');

};

function generateTitleLinks() {
  console.log('Generate Title Links');

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('Title list is clear');

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {


    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('Article ID', articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('article title', articleTitle);

    /* get the title from the title element */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('link HTML', linkHTML);

    /* create HTML of the link */

    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;
    console.log('title list', titleList);

  }

  const links = document.querySelectorAll('.titles a');
  console.log('links', links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }


}

generateTitleLinks();


function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {


    /* find tags wrapper */
    const wrapperTags = article.querySelector(optArticleTagsSelector);
    console.log('wrapper Tags', wrapperTags);

    /* make html variable with empty string */
    let html = '';
    console.log('html',html);

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('article Tags', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('Article Tags Array',articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      //console.log('loop for tag', tag);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '&nbsp;' +'</span></a></li>';
      //console.log('link HTML', linkHTML);

      /* add generated code to html variable */
      wrapperTags.innerHTML = wrapperTags.innerHTML + linkHTML;

    }

    /* END LOOP: for each tag */




    /* insert HTML of all the links into the tags wrapper */


  /* END LOOP: for every article: */
  }
  const links = document.querySelectorAll('.list a');
  console.log('Tag links', links);

  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }

}


generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href klikniętego tagu', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');
  console.log('TAG z href',tag);


  /* find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('Active Tags', activeTags);

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags){

    /* remove class active */
    // FIXME:activeTag.classList.remove('active');
  }

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allHref =document.querySelectorAll('a[href="' + href + '"]');
  console.log('all href',allHref);
  /* START LOOP: for each found tag link */
  for (let allTagLink of allHref){

    /* add class active */
    allHref.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag +'"]');
}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();
