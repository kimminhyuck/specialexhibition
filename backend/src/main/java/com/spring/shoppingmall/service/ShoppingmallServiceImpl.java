package com.spring.shoppingmall.service;

import com.spring.shoppingmall.repository.ShoppingmallMapper;
import com.spring.shoppingmall.vo.*;
import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

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

    @Override
    public Map<String,Object> getListDetailExhibition(int exhibitionId) {
        Map<String, Object> exhibitionMap = new HashMap<>();
        //해당 기획전 패턴 리스트
        List<ProductPatternInfoVO> patternList =  shoppingmallDao.getListDetailExhibition(exhibitionId);

        //해당 기획전 상품 리스트
        List<ProductInfoVO> productList = shoppingmallDao.getListProduct(exhibitionId);

        //각 패턴의 detailInfo 리스트 목록 데이터 할당
        for(ProductPatternInfoVO productPatternInfoVO : patternList){
            List<ProductPatternDetailVO> patternDetailList = shoppingmallDao.getListPatternDetail(productPatternInfoVO.getPrdPtIdx());
            productPatternInfoVO.setPatternDetailVOList(patternDetailList);
        }

        exhibitionMap.put("productList",productList);
        exhibitionMap.put("patternList",patternList);

        return exhibitionMap;
    }

    @Override
    public List<ProductInfoVO> getListProduct(int exhibitionId) {
        return shoppingmallDao.getListAllProduct(exhibitionId);
    }

    @Override
    @Transactional
    public int registExhibitionDetail(Map<String, Object> exhibitionDetails) {
        List<PatternDTO> patternDTOList = (List<PatternDTO>) exhibitionDetails.get("pattern");
        List<PatternDetailDTO> patternDetailDTOList = (List<PatternDetailDTO>) exhibitionDetails.get("patternDetail");
        List<ProductDTO> productDTOList = (List<ProductDTO>) exhibitionDetails.get("product");

        System.out.println("patternDTOList : "  + patternDTOList.toString());
        System.out.println("patternDetailDTOList : "  + patternDetailDTOList.toString());

        try{
            for(PatternDTO patternDTO : patternDTOList){
                String crudType =  patternDTO.getCrudType();
                if (crudType.equals("I")) {
                    shoppingmallDao.insertPattern(patternDTO);
                } else if(crudType.equals("D")) {
                    shoppingmallDao.deletePattern(patternDTO);
                } else if(crudType.equals("U")) {
                    shoppingmallDao.updatePattern(patternDTO);
                }
            }
            for(PatternDetailDTO patternDetailDTO : patternDetailDTOList){
                String crudType =  patternDetailDTO.getCrudType();
                if (crudType.equals("I")) {
                    int result = 0;
                    //파일 리스트 할당
                    List<MultipartFile> files = patternDetailDTO.getPatternImages();
                    for(MultipartFile file : files) {
                        String imgName = saveFile(file);
                        //이미지 저장 실패 시 에러 발생
                        if (Objects.equals(imgName, "")) {
                            throw new IOException();
                        } else {
                            patternDetailDTO.setPtDetailImg(imgName);
                            result = shoppingmallDao.insertPatternDetail(patternDetailDTO);
                            if(result == 0){
                                return result;
                            }
                        }
                    }
                } else if(crudType.equals("D")) {
                   int result = shoppingmallDao.deletePatternDetail(patternDetailDTO);
                   //패턴 상세 정보 delete 완료 시 로컬에 있는 이미지 삭제
                   if(result == 1){
                       String fileName = patternDetailDTO.getPtDetailImg();
                       Boolean isDeleted = deleteFile(fileName);
                       if(!isDeleted){
                           throw new IOException();
                       }
                   }
                } else if(crudType.equals("U")) {
                    // 이미지 파일 수정 시 기존 이미지 파일 삭제 및 수정된 이미지 파일 저장 로직 구현해야 함
                    // 기존에 있던 이미지 파일 추출
                    // 수정된 DTO와 이미지 파일이 일치 하지 않으면, 기존 이미지 삭제 그리고 새로 수정된 이미지 파일 저장
                    int patternDetailIdx = patternDetailDTO.getPtDetailIdx();
                    shoppingmallDao.updatePatternDetail(patternDetailDTO);
                }
            }
            for(ProductDTO productDTO : productDTOList){
                String crudType =  productDTO.getCrudType();
                if (crudType.equals("I")) {
                    shoppingmallDao.insertProduct(productDTO);
                } else if(crudType.equals("D")) {
                    shoppingmallDao.deleteProduct(productDTO);
                } else if(crudType.equals("U")) {
                    shoppingmallDao.updateProduct(productDTO);
                }
            }
            return 1;
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
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
            return "";
        }

        return fileName;
    }

    private Boolean deleteFile(String fileName) {
        String dirPath = "C:\\mallImages";
        try{
            Path filePath = Paths.get(dirPath,  fileName);
            return Files.deleteIfExists(filePath);
        } catch(IOException e){
            e.printStackTrace();
            return false;
        }
    }
}
