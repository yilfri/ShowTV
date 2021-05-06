const d = document,
	$main = d.getElementById('main'),
	$template = d.getElementById('template').content,
	$card = $template.querySelector('.card'),
	$fragment = d.createDocumentFragment(),
	api = 'https://api.tvmaze.com/search/shows?q=';

let keyShow;

const getShow = async (serie) => {
	try {
		let res = await fetch(`${api}${serie}`),
			json = await res.json();
		$main.innerHTML = '';

		if (json.length === 0) {
			$main.innerHTML = `<p class="
			not_found"><b>No hemos encontrado resultado de <i>"${serie}"</i>. <br/>
			Intenta con otra serie o Show de TV</b></p>`;
		} else {
			json.forEach((el) => {
				$template.querySelector('h3').textContent = el.show.name;
				$template.querySelector('.card__content').innerHTML = el.show.summary
					? el.show.summary.slice(0, 200)
					: 'Sin Descripción';
				$template.querySelector('img').src = el.show.image
					? el.show.image.medium
					: 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png';
				$template.querySelector('img').alt = el.show.name;
				$template.querySelector('a').href = el.show.url ? el.show.url : '#';
				$template.querySelector('a').textContent = 'Ver más';
				$template.querySelector('a').target = '_blank';
				let $clone = d.importNode($template, true);
				$fragment.appendChild($clone);
			});

			$main.appendChild($fragment);
		}

		if (!res.ok) throw { status: res.status, statusText: res.statusText };
	} catch (error) {
		console.log(error);
	}
};

d.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		keyShow = e.target.value;
		$main.innerHTML = `
				<img class = "loader" src="../assets/main-loader.svg" alt="Cargando" />
			`;
		getShow(keyShow);
	}
});
