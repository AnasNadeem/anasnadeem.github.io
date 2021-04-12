let api_job_item_num = 'https://hacker-news.firebaseio.com/v0/jobstories.json'
async function getData() {
    let response = await fetch(api_job_item_num);
    let data = await response.json();
    let mainCon = document.getElementById('mainCon');
    let loadMore = document.getElementById('loadMore')
    let searchBtn = document.getElementById('searchBtn')
    function getNumData(num) {
        for (let i = 0; i <= num; i++) {
            data_index = data[i]
            let api = `https://hacker-news.firebaseio.com/v0/item/${data_index}.json`
            async function getDetails() {
                let res = await fetch(api)
                let data_res = await res.json()
                let data_res_title = data_res.title;
                let data_res_url = data_res.url;
                let temp = `
                <div class="row">
                    <div class="col-lg-8 col-10 mx-auto">
                        <div class="card mt-2">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${data_res_title}
                                </h5>
                                <a href="${data_res_url}" target="_blank" class="btn btn-outline-primary">Apply Now</a>
                            </div>
                        </div>
                    </div>
                </div>`
                mainCon.innerHTML += temp;
                return data_res;
            }
            getDetails()
        }
    }
    for (let i = 0; i <= 60; i++) {
        data_index = data[i]
        let api = `https://hacker-news.firebaseio.com/v0/item/${data_index}.json`
        async function getDetails() {
            let res = await fetch(api)
            let data_res = await res.json()
            let data_res_title = data_res.title;
            let data_res_url = data_res.url;
            let temp = `
            <div class="row">
                <div class="col-lg-8 col-10 mx-auto">
                    <div class="card mt-2">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${data_res_title}
                            </h5>
                            <a href="${data_res_url}" target="_blank" class="btn btn-outline-primary">Apply Now</a>
                        </div>
                    </div>
                </div>
            </div>`
            searchBtn.addEventListener('click', function () {
                let searchTerm = document.getElementById('searchTerm').value
                searchTerm = searchTerm.toLowerCase()
                data_res_title = data_res_title.toLowerCase()
                searchStrInData = data_res_title.search(searchTerm)
                if (searchStrInData >= 1) {
                    let searchedJobsRes = document.getElementById('searchedJobsRes')
                    searchedJobsRes.innerHTML += temp
                }
            })


            return data_res;
        }
        getDetails()
    }
    loadMore.addEventListener('click', function numChange() {
        getNumData(60)
    })
    getNumData(20)

    return data;
}
getData()