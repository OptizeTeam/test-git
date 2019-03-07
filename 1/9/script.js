var globalUsers = [
	{
		id: 1,
		name: 'Emil',
		surname: 'Sienkiewicz'
	},
	{
		id: 2,
		name: 'Małgorzata',
		surname: 'Gratkowska'
	},
	{
		id: 3,
		name: 'Michał',
		surname: 'Skórcz'
	},
	{
		id: 4,
		name: 'Anna',
		surname: 'Borowska'
	},
	{
		id: 5,
		name: 'Maria',
		surname: 'Kalabińska'
	},
	{
		id: 6,
		name: 'Szymon',
		surname: 'Linowski'
	},
	{
		id: 7,
		name: 'Artur',
		surname: 'Rózgowski'
	},
	{
		id: 8,
		name: 'Krystian',
		surname: 'Kulesz'
	},
	{
		id: 9,
		name: 'Martyna',
		surname: 'Szeszko'
	},
	{
		id: 10,
		name: 'Paweł',
		surname: 'Kolasiński'
	},
	{
		id: 11,
		name: 'Małgorzata',
		surname: 'Kowalska'
	},
	{
		id: 12,
		name: 'Michał',
		surname: 'Szewski'
	},
	{
		id: 13,
		name: 'Anita',
		surname: 'Jakaśtam'
	},
	{
		id: 14,
		name: 'Łukasz',
		surname: 'Gręźlikowski'
	},
	{
		id: 15,
		name: 'Jacek',
		surname: 'Linowski'
	},
	{
		id: 16,
		name: 'Artur',
		surname: 'Nowak'
	},
	{
		id: 17,
		name: 'Krystian',
		surname: 'Małysz'
	},
	{
		id: 18,
		name: 'Martyna',
		surname: 'Wojciechowska'
	},
	{
		id: 19,
		name: 'Kordian',
		surname: 'Kolasiński'
	}
];

var filterMap = {
	id: 'numeric',
	name: 'alphabetical',
	surname: 'alphabetical'
};

var $userList = $('#user-list'),
	$filterField = $('#filter-field'),
	$filterType = $('#filter-type'),
	$filterValue = $('#filter-value'),
	$filterAccept = $('#filter-accept');

function populateTable(users) {
	$userList.html('');

	users.forEach(function (user) {
		$userList.append(
			'<tr>' +
			'<td>' +
			user.id +
			'</td>' +
			'<td>' +
			user.name +
			'</td>' +
			'<td>' +
			user.surname +
			'</td>' +
			'</tr>'
		);
	});
}

function filterTable() {
	var tmpUsers = [],
		filterFieldValue = $filterField.val(),
		filterTypeValue = $filterType.val(),
		filterValueValue = $filterValue.val();

	switch (filterFieldValue) {
		case 'id':
			filterValueValue = Number(filterValueValue);

			switch(filterTypeValue) {
				case 'equal':
					globalUsers.forEach(function (user) {
						if (filterValueValue === user.id) {
							tmpUsers.push(user);
						}
					});
					break;
				case 'not-equal':
					globalUsers.forEach(function (user) {
						if (filterValueValue !== user.id) {
							tmpUsers.push(user);
						}
					});
					break;
				case 'higher-than':
					globalUsers.forEach(function (user) {
						if (filterValueValue < user.id) {
							tmpUsers.push(user);
						}
					});
					break;
				case 'lower-than':
					globalUsers.forEach(function (user) {
						if (filterValueValue > user.id) {
							tmpUsers.push(user);
						}
					});
					break;
				default:
					tmpUsers = globalUsers;
			}
			break;
		case 'name':
		case 'surname':
			switch(filterTypeValue) {
				case 'equal':
					globalUsers.forEach(function (user) {
						if (filterValueValue === user[filterFieldValue]) {
							tmpUsers.push(user);
						}
					});
					break;
				case 'not-equal':
					globalUsers.forEach(function (user) {
						if (filterValueValue !== user[filterFieldValue]) {
							tmpUsers.push(user);
						}
					});
					break;
				case 'contains':
					globalUsers.forEach(function (user) {
						if (-1 !== user[filterFieldValue].toLowerCase().indexOf(filterValueValue.toLowerCase())) {
							tmpUsers.push(user);
						}
					});
					break;
				case 'not-contains':
					globalUsers.forEach(function (user) {
						if (-1 === user[filterFieldValue].toLowerCase().indexOf(filterValueValue.toLowerCase())) {
							tmpUsers.push(user);
						}
					});
					break;
				default:
					tmpUsers = globalUsers;
			}
			break;
		default:
			tmpUsers = globalUsers;
	}

	populateTable(tmpUsers);
}

function setAvailableFilters() {
	$filterType.find('option').hide();
	$filterType.find('.' + filterMap[$filterField.val()]).show();
	$filterType.find('option:visible').first().prop('selected', true);
}

$filterAccept.on('click', function (e) {
	e.preventDefault();

	filterTable();
});

$filterField.on('change', setAvailableFilters);

setAvailableFilters();
populateTable(globalUsers);