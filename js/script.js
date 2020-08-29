/* document.getElementById('test-button').addEventListener('click', function(){
const links = document.querySelectorAll('.titles a');
console.log('links:', links);
});*/

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template').innerHTML),
  articleLinkTag: Handlebars.compile(document.querySelector('#template-Link-Tag').innerHTML),
  articleLinkAuthor: Handlebars.compile(document.querySelector('#template-Link-Author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-Tag-Cloud-Link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-Author-Cloud-Link').innerHTML)
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorListSelector = '.authors.list';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  // console.log('Link was clicked!');
  // console.log(event);

  /*[DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  // console.log('clickedElement:', clickedElement);

  /*[DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  // console.log('articleSelector', articleSelector);



  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  // console.log('targetArticle', targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');

};

function generateTitleLinks(customSelector = '') {
  //console.log('optArticleSelector + customSelector =', optArticleSelector, customSelector);

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  // console.log('Title list is clear');

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for (let article of articles) {


    /* get the article id */
    const articleId = article.getAttribute('id');
    // console.log('Article ID', articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // console.log('article title', articleTitle);

    /* get the title from the title element */
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    //console.log('link HTML', linkHTML);

    /* create HTML of the link */

    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;
    // console.log('title list', titleList);

  }

  const links = document.querySelectorAll('.titles a');
  // console.log('links', links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }


}

generateTitleLinks();


function calculateTagsParams(tags) {
  const params = { 'max': 0, 'min': 999999 };
  for (let tag in tags) {
    //console.log(tag + ' is used ' + tags[tag] + ' times');

    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }

  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;

}

function generateTags() {
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {


    /* find tags wrapper */
    const wrapperTags = article.querySelector(optArticleTagsSelector);
    // console.log('wrapper Tags', wrapperTags);

    /* make html variable with empty string */
    let html = '';
    // console.log('html',html);

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log('article Tags', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log('Article Tags Array',articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      //console.log('loop for tag', tag);

      /* generate HTML of the link */
      /* wygeneruj kod HTML linku */
      //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '&nbsp;' + '</span></a></li>';
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.articleLinkTag(linkHTMLData);

      //console.log('link HTML', linkHTML);

      /* add generated code to html variable */
      /* dodaj wygenerowany kod do zmiennej html */
      // wrapperTags.innerHTML = wrapperTags.innerHTML + linkHTML;

      html += linkHTML;
      // console.log('Wrapper Tags = ', wrapperTags);
      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }



    }

    /* END LOOP: for each tag */




    /* insert HTML of all the links into the tags wrapper */
    /* wstaw kod HTML wszystkich linków do opakowania tagów */
    wrapperTags.innerHTML = html;


    /* END LOOP: for every article: */
  }
  // const links = document.querySelectorAll('.list a');
  // console.log('Tag links', links);

  // for (let link of links) {
  //link.addEventListener('click', tagClickHandler);
  //}
  const tagList = document.querySelector('.tags');
  //tagList.innerHTML = allTags.join(' ');
  //console.log('alltags po prawej', allTags);

  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams:', tagsParams);


  /* [NEW] create variable for all links HTML code */
  //let allTagsHTML = '';
  const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //const tagLinkHtml = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + '(' + allTags[tag] + ')' + '</span></a></li>';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    //console.log('tagLinkHTML', allTagsHTML);
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('wszystkie tag data', allTagsData);







}



generateTags();





function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log('href klikniętego tagu', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  // console.log('TAG z href',tag);


  /* find all tag links with class active */
  /* znajdź wszystkie linki do tagów z aktywną klasą */

  const allLinksTagActiveClass = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('Active Tags', allLinksTagActiveClass); // nie pokazuje actywnych tagow

  /* START LOOP: for each active tag link */
  for (let activeTag of allLinksTagActiveClass) {

    /* remove class active */
    activeTag.classList.remove('active');
  }

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  /* znajdź wszystkie linki do tagów z atrybutem „href” równym stałej „href” */

  const allhref = document.querySelectorAll('a[href="' + href + '"]');
  // console.log('all href',allhref);
  /* START LOOP: for each found tag link */
  for (let allTagLink of allhref) {

    /* add class active */
    allTagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  /* znajdź wszystkie linki do tagów */
  const allTagLink = document.querySelectorAll('[href^="#tag-"]');
  // console.log('all Tag Link=', allTagLink);

  /* START LOOP: for each link */
  for (let tagLink of allTagLink) {

    /* add tagClickHandler as event listener for that link */
    /* dodaj tagClickHandler jako detektor zdarzeń dla tego linku */
    tagLink.addEventListener('click', tagClickHandler);

  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {

  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log('Wszystkie Artykuły', articles);


  /*START LOOP: for every article*/
  for (let article of articles) {

    /*find author wrapper*/
    const wrapperAuthors = article.querySelector(optArticleAuthorSelector);
    //console.log('Wrapper', wrapperAuthors);



    /*get author from data-author*/
    const articleAuthor = article.getAttribute('data-author');
    //console.log('Autor', articleAuthor);


    /*generate HTML of the link*/
    //const linkAuthor = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
    const linkHTMLData = { id: articleAuthor, title: articleAuthor };
    const linkAuthor = templates.articleLinkAuthor(linkHTMLData);

    //console.log('link autor', linkAuthor);

    /*insert author into the wrapper*/
    wrapperAuthors.innerHTML += linkAuthor;
    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    //console.log('zlicznie ',allAuthors);

    const authorList = document.querySelector('.authors');
    //let allAuthorHTML = '';
    const allAuthorData = { authors: [] };

    for (let articleAuthor in allAuthors) {
      //allAuthorHTML += '<li><a href="#author-' + articleAuthor + '"><span class="post-author">' + articleAuthor + '(' + allAuthors[articleAuthor] + ')</span></a></li>';

      allAuthorData.authors.push({
        author: articleAuthor,
        count: allAuthors[articleAuthor]

      });

      //authorList.innerHTML = allAuthorHTML;
      authorList.innerHTML = templates.authorCloudLink(allAuthorData);
      console.log('autorzy', allAuthorData);


    }
    /*END LOOP: for every article*/



  }




}

generateAuthors();


function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  //console.log('klikniety element href', href);

  const author = href.replace('#author-', '');
  //console.log('sam autor',author);

  const allLinksAuthorActiveClass = document.querySelectorAll('a.active[href^="#author-"]');
  //console.log('Active Authors', allLinksAuthorActiveClass); //nie pokazuje actywnych autorów

  for (let activeAuthor of allLinksAuthorActiveClass) {
    activeAuthor.classList.remove('active');
  }

  const allHref = document.querySelectorAll('a[href="' + href + '"]');

  for (let allAuthorLink of allHref) {
    allAuthorLink.classList.add('active');
  }
  generateTitleLinks('[data-author~="' + author + '"]');

}


function addClickListenersToAuthors() {
  const allAuthorsLink = document.querySelectorAll('[href^="#author-"]');
  //console.log('link autor', allAuthorsLink);
  for (let author of allAuthorsLink) {
    author.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
