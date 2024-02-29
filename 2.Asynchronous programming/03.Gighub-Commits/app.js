function loadCommits() {
    let username = document.getElementById("username").value;
    let repository = document.getElementById("repo").value;
	const url = `https://api.github.com/repos/${username}/${repository}/commits`;
	let list = document.getElementById("commits");
	fetch (url)
	.then(onHeaders)
	.then(onSuccess)
	.catch(onError);

	function onHeaders(res) {
		if(!res.ok) {
			throw 'Error'
		}
		return res.json();
	}
	function onSuccess(data) {
	list.replaceChildren(...data.map(createListItem));
    console.log(data);

	}
	function onError(error) {
		list.textContent = error;
	}

	function createListItem({commit}) {
		let li = document.createElement("li");
		let a = document.createElement("a");
		a.href = commit.author.name
        console.log(commit.author.name);
		a.textContent = `${commit.author.name}:${commit.message}`;
		li.appendChild(a);
		return li;
	}
}