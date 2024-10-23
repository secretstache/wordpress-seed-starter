<?php

namespace App\Fields\Objects;

use StoutLogic\AcfBuilder\FieldsBuilder;

class Testimonial {

	public function __construct() {

        /**
		 * Testimonial Info
		 */
		$testimonialInfo = new FieldsBuilder('testimonial_info', [
            'title'    => 'Testimonial Info',
			'position' => 'acf_after_title'
		]);

		$testimonialInfo

            ->addImage('testimonial_headshot', [
                'label'         => 'Headshot',
                'preview_size'  => 'medium',
            ])

            ->addWysiwyg('testimonial_quote',[
                'label'         => 'Quote',
                'tabs'          => 'all',
                'toolbar'       => 'basic',
                'media_upload'  => 0
            ])

            ->addText('testimonial_citation_name', [
                'label'         => 'Citation Name',
                'wrapper'       => [
                    'width'     => 50
                ]
            ])

            ->addText('testimonial_job_title', [
                'label'         => 'Job Title',
                'wrapper'       => [
                    'width'     => 50
                ]
            ])

			->setLocation('post_type', '==', 'ssm_testimonial');

		// Register Testimonial Info
		add_action('acf/init', function() use ($testimonialInfo) {
			acf_add_local_field_group($testimonialInfo->build());
		});

    }

}
