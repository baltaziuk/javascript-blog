
    /* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

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

    }

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }


    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks() {
        console.log('Generate Title Links');
        
        /* remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector).innerHTML = '';
        console.log('Title list is clear');

        /* for each article */
        
        const articles = document.querySelectorAll(optArticleSelector);
        for (article of articles);
        console.log('articles', articles); 

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

    generateTitleLinks();

