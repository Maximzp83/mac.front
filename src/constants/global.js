const SECTIONS = {
	COMPANY: 1,
	MODEM: 2,
	POINT_SALE: 3,
	USER: 4,
	ROLE: 5
};

const userTypesList = [
	{ id: 1, name: 'Внутренний' },
	{ id: 2, name: 'Внешний' },
]

const initialRulesFormData = [
	{ruleType: 1, create:false, update:false, delete:false, view:false },
	{ruleType: 2, create:false, update:false, delete:false, view:false },
	{ruleType: 3, create:false, update:false, delete:false, view:false },
	{ruleType: 4, create:false, update:false, delete:false, view:false },
	{ruleType: 5, create:false, update:false, delete:false, view:false }
]

const ruleTypes = [
	{ ruleType: SECTIONS.COMPANY, 		name: 'Company' },
	{ ruleType: SECTIONS.MODEM, 			name: 'Modem' },
	{ ruleType: SECTIONS.POINT_SALE, 	name: 'Point sale' },
	{ ruleType: SECTIONS.USER, 				name: 'User' },
	{ ruleType: SECTIONS.ROLE, 				name: 'Role' }
]


export { SECTIONS, userTypesList, initialRulesFormData, ruleTypes }
