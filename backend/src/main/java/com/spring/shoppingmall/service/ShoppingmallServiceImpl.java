package com.spring.shoppingmall.service;

import com.spring.shoppingmall.repository.ShoppingmallMapper;
import com.spring.shoppingmall.vo.ExhibitionDTO;
import com.spring.shoppingmall.vo.ProductGroupInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class ShoppingmallServiceImpl implements ShoppingmallService {

    @Autowired
    private ShoppingmallMapper shoppingmallDao;

    @Override
    public List<ProductGroupInfoVO> getListExhibition(){
        return shoppingmallDao.getListExhibition();
    }

    @Override
    public int registExhibition(ExhibitionDTO exhibitionDTO) {
        int result = 0;
        MultipartFile file = exhibitionDTO.getPrdGrImg();
        String imgName = saveFile(file);
        if(!Objects.equals(imgName, "")){
            exhibitionDTO.setImgName(imgName);
            System.out.println("최종 : " + exhibitionDTO.toString());
            result = shoppingmallDao.insertExhibition(exhibitionDTO);
        }
        return result;
    }

    private String saveFile(MultipartFile file) {
        String fileName = "";
        try {
            //저장할 파일 경로
            String savePath = "C:\\mallImages";

            //파일 이름 중복 방지 타임스탬프
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

            //현재 날짜시간 문자열
            String timestamp = LocalDateTime.now().format(formatter);
            fileName = timestamp +"_" + file.getOriginalFilename();

            //저장할 전체 경로
            File destFile = new File(savePath + File.separator + fileName);

            file.transferTo(destFile);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return fileName;
    }
}
