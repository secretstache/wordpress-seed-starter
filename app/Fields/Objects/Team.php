<?php

namespace App\Fields\Objects;

use StoutLogic\AcfBuilder\FieldsBuilder;

class Team {

	public function __construct() {

        /**
		 * Team Member Info
		 */
		$teamMemberInfo = new FieldsBuilder('team_member_info', [
			'title'     => 'Team Member Info',
			'position'  => 'acf_after_title',
		]);

		$teamMemberInfo

			->addImage('team_headshot', [
				'label'			=> 'Headshot',
				'preview_size'	=> 'medium',
			])

			->addTaxonomy('team_category', [
				'label'         => 'Category',
				'taxonomy'      => 'ssm_team_category',
				'field_type'    => 'select',
				'allow_null'    => 0,
				'add_term'      => 1,
				'save_terms'    => 1,
				'load_terms'    => 1,
				'return_format' => 'object',
				'multiple'      => 0
			])

            ->addText('team_job_title', [
				'label'     => 'Job Title',
			])

			->setLocation('post_type', '==', 'ssm_team');

		// Register Team Member Info
		add_action('acf/init', function() use ($teamMemberInfo) {
			acf_add_local_field_group($teamMemberInfo->build());
		});

    }

}