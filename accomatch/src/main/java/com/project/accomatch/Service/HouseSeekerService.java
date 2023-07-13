package com.project.accomatch.Service;

import com.project.accomatch.Model.HouseSeekerModel;


import java.util.List;

public interface HouseSeekerService {
    String createAD(HouseSeekerModel houseSeekerModel);

    List<HouseSeekerModel> getListOfAllApplicantPosts();
}