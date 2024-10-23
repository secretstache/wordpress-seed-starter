<?php

namespace App\View\Composers\Pages;

use App\View\Composers\SSM;

class SingleTeamMember extends SSM
{

    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'single-ssm_team'
    ];

    /**
     * Data to be passed to view before rendering.
     *
     * @return array
     */
    public function with()
    {

        $data = collect($this->fields())->toArray();

        return [
            'name'      => $data['team_first_name'] && $data['team_last_name'] ? $data['team_first_name'] . ' ' . $data['team_last_name'] : get_the_title(),
            'headshot'  => $data['team_headshot'],
            'job_title' => $data['team_job_title'],
            'location'  => $data['team_division_location'],
            'bio'       => $data['team_bio']
        ];
    }
}
